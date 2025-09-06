"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYNC = void 0;
const debug_1 = __importDefault(require("debug"));
const feathers_1 = require("@feathersjs/feathers");
const commons_1 = require("@feathersjs/commons");
const coreDebug = (0, debug_1.default)('feathers-sync');
exports.SYNC = Symbol('feathers-sync/enabled');
const defaultEvents = ['created', 'updated', 'removed', 'patched'];
const getServiceOptions = (service) => {
    if (typeof feathers_1.feathers.getServiceOptions === 'function') {
        return feathers_1.feathers.getServiceOptions(service);
    }
    return {};
};
exports.default = (app) => {
    const syncApp = app;
    if (syncApp[exports.SYNC]) {
        return;
    }
    syncApp[exports.SYNC] = true;
    if (syncApp.sync) {
        throw new Error('Only one type of feathers-sync can be configured on the same application');
    }
    syncApp.on('sync-in', (rawData) => {
        const { event, path, data, context } = syncApp.sync.deserialize(rawData);
        const service = syncApp.service(path);
        const hook = context
            ? Object.assign({ app: syncApp, service }, context)
            : context;
        if (service) {
            coreDebug(`Dispatching sync-in event '${path} ${event}'`);
            service._emit(event, data, hook);
        }
        else {
            coreDebug(`Invalid sync event '${path} ${event}'`);
        }
    });
    syncApp.mixins.push((service, path) => {
        if (typeof service._emit !== 'function') {
            const { events: customEvents = service.events } = getServiceOptions(service);
            const events = defaultEvents.concat(customEvents || []);
            service._emit = service.emit;
            service.emit = function (event, data, ctx) {
                const disabled = ctx && ctx[exports.SYNC] === false;
                if (!events.includes(event) || disabled) {
                    coreDebug(`Passing through non-service event '${path} ${event}'`);
                    return this._emit(event, data, ctx);
                }
                const serializedContext = ctx && typeof ctx.toJSON === 'function' ? ctx.toJSON() : ctx;
                const context = ctx && (ctx.app === syncApp || ctx.service === service)
                    ? commons_1._.omit(serializedContext, 'app', 'service', 'self')
                    : serializedContext;
                coreDebug(`Sending sync-out event '${path} ${event}'`);
                return syncApp.emit('sync-out', syncApp.sync.serialize({
                    event, path, data, context
                }));
            };
        }
    });
};
//# sourceMappingURL=core.js.map