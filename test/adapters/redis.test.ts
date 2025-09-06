import { describe, it, expect, beforeAll } from 'vitest';
import * as bson from 'bson';
import createApp from './app';
import { SyncApp } from '../../lib/types';

describe('feathers-sync Redis tests', () => {
  const appFactory = createApp({
    uri: 'redis://localhost:6379'
  });

  let app1: SyncApp, app2: SyncApp, app3: SyncApp;

  beforeAll(async () => {
    app1 = appFactory() as SyncApp;
    await app1.sync.ready;

    app2 = appFactory() as SyncApp;
    await app2.sync.ready;

    app3 = appFactory() as SyncApp;
    await app3.sync.ready;
  });

  it('initialized with redis adapter', () => {
    expect(app1.sync).toBeTruthy();
    expect(app1.sync.type).toBe('redis');
  });

  it('creating todo on app1 trigger created on all apps with hook context', () => {
    const original = { test: 'data' };
    let count = 0;
    
    return new Promise<void>((resolve, reject) => {
      const onCreated = (app: SyncApp) => {
        app.service('todo').once('created', (data: any, context: any) => {
          expect(data).toEqual(original);
          expect(context).toBeTruthy();
          expect(context.result).toEqual(data);
          expect(context.method).toBe('create');
          expect(context.type).toBe('around');
          expect(context.service).toBe(app.service('todo'));
          expect(context.app).toBe(app);

          count++;
          if (count === 3) {
            resolve();
          }
        });
      };

      onCreated(app1);
      onCreated(app2);
      onCreated(app3);

      app1.service('todo').create(original).then((data: any) => {
        expect(data).toEqual(original);
      }).catch(reject);
    });
  });
});

describe('feathers-sync Redis custom serializer / deserializer tests', () => {
  const appFactory = createApp({
    uri: 'redis://localhost:6379',
    key: 'feathers-sync2',
    redisOptions: { return_buffers: true },
    serialize: bson.serialize,
    deserialize: bson.deserialize
  });

  let app1: SyncApp, app2: SyncApp, app3: SyncApp;

  beforeAll(async () => {
    app1 = appFactory() as SyncApp;
    await app1.sync.ready;

    app2 = appFactory() as SyncApp;
    await app2.sync.ready;

    app3 = appFactory() as SyncApp;
    await app3.sync.ready;
  });

  it('should sync data with binary serializer', () => {
    const original = { test: 'data', date: new Date() };
    let count = 0;
    
    return new Promise<void>((resolve, reject) => {
      const onCreated = (app: SyncApp) => {
        app.service('todo').once('created', (data: any, context: any) => {
          expect(data.date.getTime()).toBe(original.date.getTime());
          expect(context.result.date.getTime()).toBe(data.date.getTime());

          count++;
          if (count === 3) {
            resolve();
          }
        });
      };

      onCreated(app1);
      onCreated(app2);
      onCreated(app3);

      app1.service('todo').create(original).then((data: any) => {
        expect(data.date.getTime()).toBe(original.date.getTime());
      }).catch(reject);
    });
  });
});
