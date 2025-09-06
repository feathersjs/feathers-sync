import { createClient, RedisClientType } from 'redis';
import debug from 'debug';
import { Application } from '@feathersjs/feathers';
import core from '../core';
import { RedisSyncOptions, SyncApp } from '../types';

const redisDebug = debug('feathers-sync:redis');

export default (config: RedisSyncOptions) => {
  return (app: Application): void => {
    const syncApp = app as SyncApp;
    const { key = 'feathers-sync', serialize = JSON.stringify, deserialize = JSON.parse, redisClient, uri } = config;
    const options = {
      url: uri,
      ...config.redisOptions
    };

    if (!redisClient) {
      redisDebug(`Setting up Redis client for ${options.url}`);
    }

    const pub: RedisClientType = redisClient || createClient(options);
    const sub: RedisClientType = pub.duplicate();
    const errorHandlers = pub.listeners('error') as ((...args: any[]) => void)[];

    if (errorHandlers.length > 0) {
      // If error handlers exists, copy them to sub
      errorHandlers.forEach((handler) => {
        sub.on('error', handler);
      });
    } else {
      // If not, make sure both pub and sub has an error handler to avoid unhandled rejections
      const defaultErrorHandler = (err: Error) => {
        console.error('REDIS ERROR', err);
      };
      pub.on('error', defaultErrorHandler);
      sub.on('error', defaultErrorHandler);
    }

    const msgFromRedisHandler = (message: Buffer | string, channel?: string) => {
      const data = typeof message === 'string' ? message : message.toString();
      redisDebug(`Got ${key} message from Redis`);
      syncApp.emit('sync-in', data);
    };

    syncApp.configure(core);
    syncApp.sync = {
      deserialize,
      serialize,
      pub,
      sub,
      type: 'redis',
      ready: new Promise((resolve, reject) => {
        pub.connect();
        sub.connect();
        sub.once('ready', resolve);
        sub.once('error', reject);
      }).then(() => sub.subscribe(key, msgFromRedisHandler as any, true))
    };

    syncApp.on('sync-out', (data: string) => {
      redisDebug(`Publishing key ${key} to Redis`);
      pub.publish(key, data);
    });
  };
};