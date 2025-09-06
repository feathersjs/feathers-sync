const amqpConnectionManager = require('amqp-connection-manager')
const debug = require('debug')('feathers-sync:amqp')
const core = require('../core')

module.exports = (config) => {
  const amqpConnection = amqpConnectionManager.connect(
    [config.uri],
    config.amqpConnectionOptions
  )
  const { deserialize, serialize, key = 'feathersSync' } = config
  debug(`Setting up AMQP connection ${config.uri}`)
  return (app) => {
    app.configure(core)
    const channelWrapper = amqpConnection.createChannel({
      json: true,
      setup: async (channel) => {
        try {
          // Creates a broadcast channel
          await channel.assertExchange(key, 'fanout', { durable: false })

          // Creates a queue and the data will be deleted after delivering being consumed.
          const { queue } = await channel.assertQueue('', {
            autoDelete: true
          })
          // Binds the exchange broadcast to the queue
          await channel.bindQueue(queue, key, 'queue-binding')

          // Send the message to the service
          channel.consume(
            queue,
            (message) => {
              if (message !== null) {
                debug(`Got ${key} event from AMQP channel`)
                app.emit('sync-in', message.content)
              }
            },
            { noAck: true }
          )

          function publishToQueue(data) {
           try {
              const publishResponse = channel.publish(
                key,
                queue,
                Buffer.from(data)
              )
              debug(`Publish success: |${publishResponse}| AMQP channel`)
            } catch (error) {
              debug(`Publish fail: |${error.message}| AMQP channel`)
            }
          }

          // Publish the received message to the queue
          app.on('sync-out', publishToQueue)

          channel.on('close', () => {
            debug('Channel closed')
            app.off('sync-out', publishToQueue)
          })

          return channel
        } catch (error) {
          debug(`Publish fail: |${error.message}| AMQP channel`)
        }
      }
    })
    const ready = new Promise((resolve, reject) => {
      channelWrapper.on('close', () => {
        reject(new Error('Channel was closed unexpectedly'))
      })
      channelWrapper.on('connect', () => {
        resolve()
      })
      channelWrapper.on('error', (error) => {
        reject(new Error(error.message))
      })
    })
    app.sync = {
      deserialize,
      serialize,
      ready,
      connection: amqpConnection, // can be useful for tracking amqp connection states
      type: 'amqp'
    }
  }
}
