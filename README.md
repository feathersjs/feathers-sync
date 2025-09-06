# Feathers sync

[![CI](https://github.com/feathersjs-ecosystem/feathers-sync/workflows/CI/badge.svg)](https://github.com/feathersjs-ecosystem/feathers-sync/actions?query=workflow%3ACI)
[![Download Status](https://img.shields.io/npm/dm/feathers-sync.svg?style=flat-square)](https://www.npmjs.com/package/feathers-sync)

> Synchronize service events between application instances

<!-- TOC -->

- [Feathers sync](#feathers-sync)
  - [About](#about)
    - [Usage](#usage)
    - [`app.sync`](#appsync)
    - [Disabling synchronization](#disabling-synchronization)
  - [Adapters](#adapters)
    - [Redis](#redis)
    - [AMQP](#amqp)
    - [NATS](#nats)
  - [How it works](#how-it-works)
  - [Caveat: Listening to service events](#caveat-listening-to-service-events)
  - [Custom Serializer / Deserializer](#custom-serializer--deserializer)
  - [Writing custom adapters](#writing-custom-adapters)
  - [License](#license)

<!-- /TOC -->

## About

When running multiple instances of your Feathers application (e.g. on several Heroku Dynos), service events (`created`, `updated`, `patched`, `removed` and any custom defined events) do not get propagated to other instances.

feathers-sync uses a messaging mechanism to propagate all events to all application instances. It currently supports:

- Redis via [redis](https://github.com/NodeRedis/node_redis)
- AMQP (RabbitMQ) via [amqplib](https://github.com/squaremo/amqp.node)

This allows to scale real-time websocket connections to any number of clients.

### Usage

The application initialized in the following example will use the local `feathers-sync` database and `sync` collection and share service events with every other instance connected to the same database:

```js
const feathers = require('@feathers/feathers')
const sync = require('feathers-sync')

const app = feathers()

app.configure(
  sync({
    uri: 'redis://localhost:6379'
  })
)
app.use('/todos', todoService)
```

> Note that configuring sync should happen before configuring services

### `app.sync`

When set up, `app.sync` will contain the following information:

- `type` - The adapter type (e.g. `redis` or `amqp`)
- `ready` - A promise that resolves when the synchronization mechanism is ready

```js
app.sync.ready.then(() => {
  // Do things here
})
```

### Disabling synchronization

`feathers-sync` can be disabled on the service method call level in a hook by setting the `require('feathers-sync').SYNC` property on the hook context to `false`:

```js
const { SYNC } = require('feathers-sync')

app.service('messages').hooks({
  after: {
    create(context) {
      // Don't synchronize if more than 1000 items were created at once
      if (context.result.length > 1000) {
        context[SYNC] = false
      }

      return context
    }
  }
})
```

## Adapters

`feathers-sync` can be initialized either by specifying the type of adapter through the `uri` (e.g. `redis://localhost:6379`) or using e.g. `sync.redis` directly:

```js
// Configure Redis
app.configure(
  sync({
    uri: 'redis://localhost:6379'
  })
)

app.configure(
  sync.redis({
    db: redisInstance
  })
)

// Configure Redis using an existing redisClient
app.configure(
  sync.redis({
    redisClient: redisClient
  })
)
```

### Redis

- `uri` - The connection string (must start with `redis://`)
- `key` - The key under which all synchronization events will be stored (default: `feathers-sync`)
- `redisClient` - An existing instance of redisClient
- `redisOptions` - Redis [client options](http://redis.js.org/#api-rediscreateclient)

### AMQP

- `uri` - The AMQP connection string (e.g. `amqp://guest:guest@localhost:5672`).
- `key` (default: `feathers-sync`) - The name exchange where sync messages will be published
- `amqpConnectionOptions` - AMQP [connection options](http://www.squaremobius.net/amqp.node/channel_api.html#connect)

### NATS

- `uri` - The connection string (example `nats://`)
- `key` (default: `feathers-sync`) - The name of subject where sync messages will be published
- `natsConnectionOptions` - NATS [connection options](https://github.com/nats-io/nats.js#Connection-Options)

## How it works

![alt tag](https://raw.githubusercontent.com/PedroMD/feathers-sync/master/feathers-sync.png)

## Caveat: Listening to service events

With `feathers-sync` enabled all events are going to get propagated to every application instance. This means, that any event listeners registered _on the server_ should not perform any actions that change the global state (e.g. write something into the database or call to an external API) because it will end up running multiple times (once on each instance). Instead, event listeners should only be used to update the local state (e.g. a local cache) and send real-time updates to all its clients.

If you need to perform actions, for example setting up a first blog post after a new user has been created, add it to the service method itself or use a [Feathers hook](https://docs.feathersjs.com/api/hooks.html) (both of which will only run once on the instance that is handling the request).

## Custom Serializer / Deserializer

Event data are serialized and deserialized using `JSON.stringify` and `JSON.parse`. This could pose a problem if the event data contains circular reference or has `Date` values (`Date` is not a valid JSON value ([source](https://www.w3schools.com/js/js_json_datatypes.asp)) and will be serialized to a string). You can provide a custom serializer/deserializer like this:

```js
// BSON can serialize / deserialize `Date` values.
const bson = require('bson')

app.configure(
  sync({
    uri: 'redis://localhost:6379',
    // Replies will be sent to callbacks as Buffers instead of Strings for bson.deserialize to work.
    redisOptions: { return_buffers: true },
    serialize: bson.serialize,
    deserialize: bson.deserialize
  })
)
```

> `Redis` and `AMQP` can support binary serialization / deserialization (i.e. `Buffer` data). `NATS` currently does not support custom serialization / deserialization/

## Writing custom adapters

`feathers-sync` allows to implement custom adapters using the `sync-in` and `sync-out` events on the application:

```js
const { core } = require('feathers-sync')
const myMessagingService = {
  publish(data) {
    // send data here
  },

  subscribe(callback) {
    // subscribe to message queue and emit data
  }
}

module.exports = (config) => {
  // If adapter supports configurable serializer / deserializer (defaults to `JSON.stringfy` / `JSON.parse`)
  const { deserialize, serialize } = config

  return (app) => {
    app.configure(core)
    app.sync = {
      type: 'custom',
      ready: new Promise((resolve, reject) => {
        // resolve when client is ready
        // reject on connection error
      }),
      serialize,
      deserialize
    }

    // Sent every time a service
    app.on('sync-out', (data) => {
      // Publish `data` to the message queue
      myMessagingService.publish(data)
    })

    myMessagingService.subscribe((data) => {
      // Send the synchronization event to the application
      app.emit('sync-in', data)
    })
  }
}
```

The `data` for the `sync-in` event should be in the same form as the one that is sent by `sync-out` (currently it includes `{ event, path, data, context }`).

## License

Copyright (c) 2025 Feathers contributors

Licensed under the [MIT license](LICENSE).
