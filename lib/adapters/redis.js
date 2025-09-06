"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const debug_1 = __importDefault(require("debug"));
const core_1 = __importDefault(require("../core"));
const redisDebug = (0, debug_1.default)('feathers-sync:redis');
exports.default = (config) => {
    return (app) => {
        const syncApp = app;
        const { key = 'feathers-sync', serialize = JSON.stringify, deserialize = JSON.parse, redisClient, uri } = config;
        const options = {
            url: uri,
            ...config.redisOptions
        };
        if (!redisClient) {
            redisDebug(`Setting up Redis client for ${options.url}`);
        }
        const pub = redisClient || (0, redis_1.createClient)(options);
        const sub = pub.duplicate();
        const errorHandlers = pub.listeners('error');
        if (errorHandlers.length > 0) {
            // If error handlers exists, copy them to sub
            errorHandlers.forEach((handler) => {
                sub.on('error', handler);
            });
        }
        else {
            // If not, make sure both pub and sub has an error handler to avoid unhandled rejections
            const defaultErrorHandler = (err) => {
                console.error('REDIS ERROR', err);
            };
            pub.on('error', defaultErrorHandler);
            sub.on('error', defaultErrorHandler);
        }
        const msgFromRedisHandler = (message, channel) => {
            const data = typeof message === 'string' ? message : message.toString();
            redisDebug(`Got ${key} message from Redis`);
            syncApp.emit('sync-in', data);
        };
        syncApp.configure(core_1.default);
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
            }).then(() => sub.subscribe(key, msgFromRedisHandler, true))
        };
        syncApp.on('sync-out', (data) => {
            redisDebug(`Publishing key ${key} to Redis`);
            pub.publish(key, data);
        });
    };
};
//# sourceMappingURL=redis.js.map