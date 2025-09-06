import debug from 'debug';
import { feathers, Application, HookContext, Service } from '@feathersjs/feathers';
import { _ } from '@feathersjs/commons';
import { SyncData, SyncApp } from './types';

const coreDebug = debug('feathers-sync');

export const SYNC = Symbol('feathers-sync/enabled');

const defaultEvents = ['created', 'updated', 'removed', 'patched'];

const getServiceOptions = (service: Service<any>) => {
  if (typeof (feathers as any).getServiceOptions === 'function') {
    return (feathers as any).getServiceOptions(service);
  }

  return {};
};

export default (app: Application): void => {
  const syncApp = app as SyncApp;
  
  if ((syncApp as any)[SYNC]) {
    return;
  }

  (syncApp as any)[SYNC] = true;

  if (syncApp.sync) {
    throw new Error('Only one type of feathers-sync can be configured on the same application');
  }

  syncApp.on('sync-in', (rawData: any) => {
    const { event, path, data, context }: SyncData = syncApp.sync.deserialize(rawData);
    const service = syncApp.service(path);
    const hook = context
      ? Object.assign({ app: syncApp, service }, context)
      : context;

    if (service) {
      coreDebug(`Dispatching sync-in event '${path} ${event}'`);
      (service as any)._emit(event, data, hook);
    } else {
      coreDebug(`Invalid sync event '${path} ${event}'`);
    }
  });

  syncApp.mixins.push((service: Service<any>, path: string) => {
    if (typeof (service as any)._emit !== 'function') {
      const { events: customEvents = (service as any).events } = getServiceOptions(service);
      const events = defaultEvents.concat(customEvents || []);

      (service as any)._emit = (service as any).emit;
      (service as any).emit = function (event: string, data: any, ctx?: HookContext) {
        const disabled = ctx && (ctx as any)[SYNC] === false;

        if (!events.includes(event) || disabled) {
          coreDebug(`Passing through non-service event '${path} ${event}'`);
          return (this as any)._emit(event, data, ctx);
        }

        const serializedContext = ctx && typeof ctx.toJSON === 'function' ? ctx.toJSON() : ctx;
        const context = ctx && ((ctx as any).app === syncApp || (ctx as any).service === service)
          ? _.omit(serializedContext, 'app', 'service', 'self')
          : serializedContext;

        coreDebug(`Sending sync-out event '${path} ${event}'`);

        return syncApp.emit('sync-out', syncApp.sync.serialize({
          event, path, data, context
        }));
      };
    }
  });
};