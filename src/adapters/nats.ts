import { connect, StringCodec, NatsConnection, Subscription } from 'nats'
import debug from 'debug'
import { Application } from '@feathersjs/feathers'
import core from '../core'
import { NatsSyncOptions, SyncApp } from '../types'

const natsDebug = debug('feathers-sync:nats')

export default (config: NatsSyncOptions) => {
  natsDebug(`Setting up NATS connection ${config.uri}`)

  return (app: Application): void => {
    const syncApp = app as SyncApp
    const {
      uri,
      key: subject = 'feathers-sync',
      serialize = JSON.stringify,
      deserialize = JSON.parse,
      natsConnectionOptions = {}
    } = config

    // Setting up nats connection with unique servers list
    const natsClient = connect({
      ...natsConnectionOptions,
      servers: [...new Set([uri, ...(natsConnectionOptions.servers ? natsConnectionOptions.servers : [])])]
    })
    const stringCodec = StringCodec()

    syncApp.configure(core)
    syncApp.sync = {
      type: 'nats',
      serialize,
      deserialize,
      ready: new Promise<NatsConnection>((resolve, reject) => {
        natsClient
          .then((connection: NatsConnection) => {
            const sub: Subscription = connection.subscribe(subject)
            // listening events and resolving connection
            ;(async () => {
              for await (const message of sub) {
                const data = stringCodec.decode(message.data)
                natsDebug(`[${sub.getProcessed()}]: ${stringCodec.decode(message.data)}`)
                syncApp.emit('sync-in', data)
              }
              natsDebug('subscription closed')
            })()
            resolve(connection)
          })
          .catch((error: Error) => reject(error))
      })
    }

    syncApp.on('sync-out', async (data: string) => {
      const natsClient = await connect(natsConnectionOptions)
      natsDebug(`Publishing key ${subject} to NATS`)
      await natsClient.publish(subject, stringCodec.encode(data))
      await natsClient.drain()
    })
  }
}
