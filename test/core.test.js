const assert = require('assert')
const feathers = require('@feathersjs/feathers')
const sync = require('../lib/core')

describe('feathers-sync core tests', () => {
  const app = feathers()
    .configure(sync)
    .use('/todo', {
      events: ['custom'],
      async create (data) {
        return data
      }
    })

  app.sync = {
    serialize: data => data,
    deserialize: data => data
  }

  it('configuring twice does nothing', () => {
    app.configure(sync)
  })

  it('sends sync-out for service events', done => {
    const message = { message: 'This is a test' }

    app.once('sync-out', data => {
      try {
        assert.deepStrictEqual(data, {
          event: 'created',
          path: 'todo',
          data: message,
          context: {
            arguments: [message, {}],
            data: message,
            params: {},
            type: 'around',
            statusCode: undefined,
            method: 'create',
            event: 'created',
            path: 'todo',
            result: message
          }
        })
        done()
      } catch (error) {
        done(error)
      }
    })

    app.service('todo').create(message)
  })

  it('can skip sending sync event', done => {
    const message = 'This is a test'
    const handler = () => {
      done(new Error('Should never get here'))
    }

    app.service('todo').once('created', todo => {
      assert.strictEqual(todo.message, message)
      app.removeListener('sync-out', handler)
      done()
    })

    app.once('sync-out', handler)

    let synced = false

    app.service('todo').hooks({
      before (context) {
        if (!synced) {
          context[sync.SYNC] = false
          synced = true
        }

        return context
      }
    })
    app.service('todo').create({ message })
  })

  it('sends sync-out for custom events', done => {
    app.once('sync-out', data => {
      assert.deepStrictEqual(data, {
        event: 'custom',
        path: 'todo',
        data: 'testing',
        context: undefined
      })
      done()
    })

    app.service('todo').emit('custom', 'testing')
  })

  it('passes non-service events through', done => {
    const todo = app.service('todo')

    todo.once('something', data => {
      assert.strictEqual(data, 'test')
      done()
    })
    todo.emit('something', 'test')
  })

  it('sync-in event gets turned into service event', done => {
    app.service('todo').once('created', (data, context) => {
      assert.deepStrictEqual(data, { message: 'This is a test' })
      assert.strictEqual(context.app, app)
      assert.strictEqual(context.service, app.service('todo'))
      assert.strictEqual(context.method, 'create')
      assert.strictEqual(context.type, 'after')
      done()
    })
    app.emit('sync-in', {
      event: 'created',
      path: 'todo',
      data: { message: 'This is a test' },
      context: {
        data: { message: 'This is a test' },
        params: {},
        type: 'after',
        method: 'create',
        path: 'todo',
        result: { message: 'This is a test' }
      }
    })
  })

  it('sync-in fails for invalid event (path)', () => {
    try {
      app.emit('sync-in', {
        event: 'something',
        path: 'todos'
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Can not find service \'todos\'')
    }
  })
})
