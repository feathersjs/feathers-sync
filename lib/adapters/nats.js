"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("nats");
const debug_1 = __importDefault(require("debug"));
const core_1 = __importDefault(require("../core"));
const natsDebug = (0, debug_1.default)('feathers-sync:nats');
exports.default = (config) => {
    natsDebug(`Setting up NATS connection ${config.uri}`);
    return (app) => {
        const syncApp = app;
        const { uri, key: subject = 'feathers-sync', serialize = JSON.stringify, deserialize = JSON.parse, natsConnectionOptions = {} } = config;
        // Setting up nats connection with unique servers list
        const natsClient = (0, nats_1.connect)({
            ...natsConnectionOptions,
            servers: [
                ...new Set([
                    uri,
                    ...(natsConnectionOptions.servers
                        ? natsConnectionOptions.servers
                        : [])
                ])
            ]
        });
        const stringCodec = (0, nats_1.StringCodec)();
        syncApp.configure(core_1.default);
        syncApp.sync = {
            type: 'nats',
            serialize,
            deserialize,
            ready: new Promise((resolve, reject) => {
                natsClient
                    .then((connection) => {
                    const sub = connection.subscribe(subject);
                    // listening events and resolving connection
                    (async () => {
                        for await (const message of sub) {
                            const data = stringCodec.decode(message.data);
                            natsDebug(`[${sub.getProcessed()}]: ${stringCodec.decode(message.data)}`);
                            syncApp.emit('sync-in', data);
                        }
                        natsDebug('subscription closed');
                    })();
                    resolve(connection);
                })
                    .catch((error) => reject(error));
            })
        };
        syncApp.on('sync-out', async (data) => {
            const natsClient = await (0, nats_1.connect)(natsConnectionOptions);
            natsDebug(`Publishing key ${subject} to NATS`);
            await natsClient.publish(subject, stringCodec.encode(data));
            await natsClient.drain();
        });
    };
};
//# sourceMappingURL=nats.js.map