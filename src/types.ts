import { Application } from '@feathersjs/feathers';
import { RedisClientType } from 'redis';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { NatsConnection } from 'nats';

export interface SyncOptions {
  key?: string;
  uri: string;
  deserialize?: (data: any) => any;
  serialize?: (data: any) => any;
}

export interface RedisSyncOptions extends SyncOptions {
  redisClient?: RedisClientType;
  redisOptions?: Record<string, any>;
}

export interface AmqpSyncOptions extends SyncOptions {
  amqpConnectionOptions?: Record<string, any>;
}

export interface NatsSyncOptions extends SyncOptions {
  natsConnectionOptions?: Record<string, any>;
}

export interface SyncData {
  event: string;
  path: string;
  data: any;
  context?: any;
}

export interface AppSync {
  deserialize: (data: any) => SyncData;
  serialize: (data: SyncData) => any;
  ready: Promise<any>;
  type: 'redis' | 'amqp' | 'nats';
  pub?: RedisClientType;
  sub?: RedisClientType;
  connection?: AmqpConnectionManager;
  channelWrapper?: ChannelWrapper;
  natsConnection?: NatsConnection;
}

export interface SyncApp extends Application {
  sync: AppSync;
}

export declare const SYNC: unique symbol;

export type SyncFunction = (app: Application) => void;
export type AdapterFunction = (options: SyncOptions) => SyncFunction;