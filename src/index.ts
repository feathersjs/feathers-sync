import { URL } from 'url'
import core, { SYNC } from './core'
import redis from './adapters/redis'
import amqp from './adapters/amqp'
import nats from './adapters/nats'
import { SyncOptions, AdapterFunction } from './types'

const adaptors: Record<string, AdapterFunction> = {
  nats,
  redis,
  amqp,
  rabbitmq: amqp
}

const init = (options: SyncOptions) => {
  const { uri, deserialize, serialize } = options

  if (!uri) {
    throw new Error('A `uri` option with the database connection string has to be provided to feathers-sync')
  }

  if (deserialize && typeof deserialize !== 'function') {
    throw new Error('`deserialize` option provided to feathers-sync is not a function')
  }

  if (serialize && typeof serialize !== 'function') {
    throw new Error('`serialize` option provided to feathers-sync is not a function')
  }

  const { protocol } = new URL(uri)
  const name = protocol.substring(0, protocol.length - 1)
  const identifiedProtocolName = Object.keys(adaptors).find((adaptor) => name.indexOf(adaptor) !== -1)

  if (!identifiedProtocolName) {
    throw new Error(`${name} is an invalid adapter (uri ${uri})`)
  }

  const adapter = adaptors[identifiedProtocolName]!

  return adapter({
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    key: 'feathers-sync',
    ...options
  })
}

export default init
export { init, core, redis, amqp, nats, SYNC }
export const rabbitmq = amqp
export * from './types'
