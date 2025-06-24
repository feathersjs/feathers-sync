const assert = require('assert')
const bson = require('bson')
const _app = require('./app')

describe('feathers-sync Redis tests', () => {
  const createApp = _app({
    uri: 'redis://localhost:6379'
  })

  let app1, app2, app3

  before(async () => {
    app1 = createApp()
    await app1.sync.ready

    app2 = createApp()
    await app2.sync.ready

    app3 = createApp()
    await app3.sync.ready
  })

  it('initialized with redis adapter', () => {
    assert.ok(app1.sync)
    assert.strictEqual(app1.sync.type, 'redis')
  })

  it('creating todo on app1 trigger created on all apps with hook context', done => {
    const original = { test: 'data' }
    let count = 0
    const onCreated = app => {
      app.service('todo').once('created', (data, context) => {
        assert.deepStrictEqual(original, data)
        assert.ok(context)
        assert.deepStrictEqual(context.result, data)
        assert.strictEqual(context.method, 'create')
        assert.strictEqual(context.type, 'around')
        assert.strictEqual(context.service, app.service('todo'))
        assert.strictEqual(context.app, app)

        count++
        if (count === 3) {
          done()
        }
      })
    }

    onCreated(app1)
    onCreated(app2)
    onCreated(app3)

    app1.service('todo').create(original).then(data =>
      assert.deepStrictEqual(original, data)
    ).catch(done)
  })
})

describe('feathers-sync Redis custom serializer / deserializer tests', () => {
  const createApp = _app({
    uri: 'redis://localhost:6379',
    key: 'feathers-sync2',
    redisOptions: { return_buffers: true },
    serialize: bson.serialize,
    deserialize: bson.deserialize
  })

  let app1, app2, app3

  before(async () => {
    app1 = createApp()
    await app1.sync.ready

    app2 = createApp()
    await app2.sync.ready

    app3 = createApp()
    await app3.sync.ready
  })

  it('should sync data with binary serializer', done => {
    const original = { test: 'data', date: new Date() }
    let count = 0
    const onCreated = app => {
      app.service('todo').once('created', (data, context) => {
        assert.strictEqual(original.date.getTime(), data.date.getTime())
        assert.strictEqual(context.result.date.getTime(), data.date.getTime())

        count++
        if (count === 3) {
          done()
        }
      })
    }

    onCreated(app1)
    onCreated(app2)
    onCreated(app3)

    app1.service('todo').create(original).then(data => {
      assert.strictEqual(original.date.getTime(), data.date.getTime())
    }).catch(done)
  })
})
