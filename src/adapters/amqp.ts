import amqpConnectionManager, { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { ConsumeMessage, Channel } from 'amqplib';
import debug from 'debug';
import { Application } from '@feathersjs/feathers';
import core from '../core';
import { AmqpSyncOptions, SyncApp } from '../types';

const amqpDebug = debug('feathers-sync:amqp');

export default (config: AmqpSyncOptions) => {
  const amqpConnection: AmqpConnectionManager = amqpConnectionManager.connect(
    [config.uri],
    config.amqpConnectionOptions
  );
  const { deserialize = JSON.parse, serialize = JSON.stringify, key = 'feathersSync' } = config;
  amqpDebug(`Setting up AMQP connection ${config.uri}`);
  
  return (app: Application): void => {
    const syncApp = app as SyncApp;
    syncApp.configure(core);
    
    const channelWrapper: ChannelWrapper = amqpConnection.createChannel({
      json: true,
      setup: async (channel: Channel) => {
        try {
          // Creates a broadcast channel
          await channel.assertExchange(key, 'fanout', { durable: false });

          // Creates a queue and the data will be deleted after delivering being consumed.
          const { queue } = await channel.assertQueue('', {
            autoDelete: true
          });
          // Binds the exchange broadcast to the queue
          await channel.bindQueue(queue, key, 'queue-binding');

          // Send the message to the service
          channel.consume(
            queue,
            (message: ConsumeMessage | null) => {
              if (message !== null) {
                amqpDebug(`Got ${key} event from AMQP channel`);
                syncApp.emit('sync-in', message.content);
              }
            },
            { noAck: true }
          );

          function publishToQueue(data: string): void {
            try {
              const publishResponse = channel.publish(
                key,
                queue,
                Buffer.from(data)
              );
              amqpDebug(`Publish success: |${publishResponse}| AMQP channel`);
            } catch (error: any) {
              amqpDebug(`Publish fail: |${error.message}| AMQP channel`);
            }
          }

          // Publish the received message to the queue
          syncApp.on('sync-out', publishToQueue);

          channel.on('close', () => {
            amqpDebug('Channel closed');
            syncApp.off('sync-out', publishToQueue);
          });

          return channel;
        } catch (error: any) {
          amqpDebug(`Publish fail: |${error.message}| AMQP channel`);
          throw error;
        }
      }
    });
    
    const ready = new Promise<void>((resolve, reject) => {
      channelWrapper.on('close', () => {
        reject(new Error('Channel was closed unexpectedly'));
      });
      channelWrapper.on('connect', () => {
        resolve();
      });
      channelWrapper.on('error', (error: Error) => {
        reject(new Error(error.message));
      });
    });
    
    syncApp.sync = {
      deserialize,
      serialize,
      ready,
      connection: amqpConnection, // can be useful for tracking amqp connection states
      type: 'amqp'
    };
  };
};