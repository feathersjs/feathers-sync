import { describe, it, expect } from 'vitest'
import { feathers, Application } from '@feathersjs/feathers'
import sync, { SYNC } from './core'
import { SyncApp } from './types'

describe('feathers-sync core tests', () => {
  const app = feathers()
    .configure(sync)
    .use('/todo', {
      events: ['custom'],
      async create(data: any) {
        return data
      }
    }) as SyncApp

  app.sync = {
    serialize: (data: any) => data,
    deserialize: (data: any) => data,
    ready: Promise.resolve(),
    type: 'redis'
  }

  it('configuring twice does nothing', () => {
    app.configure(sync)
  })

  it('sends sync-out for service events', () => {
    const message = { message: 'This is a test' }

    return new Promise<void>((resolve, reject) => {
      app.once('sync-out', (data: any) => {
        try {
          expect(data).toEqual({
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
          resolve()
        } catch (error) {
          reject(error)
        }
      })

      app.service('todo').create(message)
    })
  })

  it('can skip sending sync event', () => {
    const message = 'This is a test'
    const handler = () => {
      throw new Error('Should never get here')
    }

    return new Promise<void>((resolve) => {
      app.service('todo').once('created', (todo: any) => {
        expect(todo.message).toBe(message)
        app.removeListener('sync-out', handler)
        resolve()
      })

      app.once('sync-out', handler)

      let synced = false

      app.service('todo').hooks({
        before(context: any) {
          if (!synced) {
            context[SYNC] = false
            synced = true
          }

          return context
        }
      })
      app.service('todo').create({ message })
    })
  })

  it('sends sync-out for custom events', () => {
    return new Promise<void>((resolve) => {
      app.once('sync-out', (data: any) => {
        expect(data).toEqual({
          event: 'custom',
          path: 'todo',
          data: 'testing',
          context: undefined
        })
        resolve()
      })

      app.service('todo').emit('custom', 'testing')
    })
  })

  it('passes non-service events through', () => {
    const todo = app.service('todo')

    return new Promise<void>((resolve) => {
      todo.once('something', (data: any) => {
        expect(data).toBe('test')
        resolve()
      })
      todo.emit('something', 'test')
    })
  })

  it('sync-in event gets turned into service event', () => {
    return new Promise<void>((resolve) => {
      app.service('todo').once('created', (data: any, context: any) => {
        expect(data).toEqual({ message: 'This is a test' })
        expect(context.app).toBe(app)
        expect(context.service).toBe(app.service('todo'))
        expect(context.method).toBe('create')
        expect(context.type).toBe('after')
        resolve()
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
  })

  it('sync-in fails for invalid event (path)', () => {
    expect(() => {
      app.emit('sync-in', {
        event: 'something',
        path: 'todos'
      })
    }).toThrow("Can not find service 'todos'")
  })
})
