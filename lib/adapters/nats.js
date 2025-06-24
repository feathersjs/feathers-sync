const { connect, StringCodec } = require('nats')
const debug = require('debug')('feathers-sync:nats')
const core = require('../core')

module.exports = (config) => {
  debug(`Setting up NATS connection ${config.uri}`)

  return (app) => {
    const {
      uri,
      key: subject,
      serialize,
      deserialize,
      natsConnectionOptions
    } = config

    // Setting up nats connection with unique servers list
    const natsClient = connect({
      ...natsConnectionOptions,
      servers: [
        ...new Set([
          uri,
          ...(natsConnectionOptions.servers
            ? natsConnectionOptions.servers
            : [])
        ])
      ]
    })
    const stringCodec = StringCodec()

    app.configure(core)
    app.sync = {
      type: 'nats',
      serialize,
      deserialize,
      ready: new Promise((resolve, reject) => {
        natsClient
          .then((connection) => {
            const sub = connection.subscribe(subject);
            // listening events and resolving connection
            (async () => {
              for await (const message of sub) {
                const data = stringCodec.decode(message.data)
                debug(
                  `[${sub.getProcessed()}]: ${stringCodec.decode(message.data)}`
                )
                app.emit('sync-in', data)
              }
              debug('subscription closed')
            })()
            resolve(connection)
          })
          .catch((error) => reject(error))
      })
    }

    app.on('sync-out', async (data) => {
      const natsClient = await connect(natsConnectionOptions)
      debug(`Publishing key ${subject} to NATS`)
      await natsClient.publish(subject, stringCodec.encode(data))
      await natsClient.drain()
    })
  }
}
