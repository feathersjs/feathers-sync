import { describe, it, expect, beforeAll } from 'vitest'
import createApp from './fixture'
import { SyncApp } from '../types'

describe('feathers-sync NATS tests', () => {
  const appFactory = createApp({
    uri: 'nats://localhost:4222',
    key: 'feathers-sync2',
    natsConnectionOptions: {
      // set debug true if debugging
      // debug: true,
      servers: ['localhost:4222']
    }
  })

  let app1: SyncApp, app2: SyncApp, app3: SyncApp

  beforeAll(async () => {
    app1 = appFactory() as SyncApp
    await app1.sync.ready

    app2 = appFactory() as SyncApp
    await app2.sync.ready

    app3 = appFactory() as SyncApp
    await app3.sync.ready
  })

  it('initialized with NATS adapter', () => {
    expect(app1.sync).toBeTruthy()
    expect(app1.sync.type).toBe('nats')
  })

  it('creating todo on app1 trigger created on all apps with hook context', () => {
    const original = { test: 'data' }
    let count = 0

    return new Promise<void>((resolve, reject) => {
      const onCreated = (app: SyncApp) => {
        app.service('todo').once('created', (data: any, context: any) => {
          expect(data).toEqual(original)
          expect(context).toBeTruthy()
          expect(context.result).toEqual(data)
          expect(context.method).toBe('create')
          expect(context.type).toBe('around')
          expect(context.service).toBe(app.service('todo'))
          expect(context.app).toBe(app)

          count++
          if (count === 3) {
            resolve()
          }
        })
      }

      onCreated(app1)
      onCreated(app2)
      onCreated(app3)

      app1
        .service('todo')
        .create(original)
        .then((data: any) => expect(data).toEqual(original))
        .catch(reject)
    })
  })
})
