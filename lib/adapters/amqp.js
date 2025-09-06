"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_connection_manager_1 = __importDefault(require("amqp-connection-manager"));
const debug_1 = __importDefault(require("debug"));
const core_1 = __importDefault(require("../core"));
const amqpDebug = (0, debug_1.default)('feathers-sync:amqp');
exports.default = (config) => {
    const amqpConnection = amqp_connection_manager_1.default.connect([config.uri], config.amqpConnectionOptions);
    const { deserialize = JSON.parse, serialize = JSON.stringify, key = 'feathersSync' } = config;
    amqpDebug(`Setting up AMQP connection ${config.uri}`);
    return (app) => {
        const syncApp = app;
        syncApp.configure(core_1.default);
        const channelWrapper = amqpConnection.createChannel({
            json: true,
            setup: async (channel) => {
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
                    channel.consume(queue, (message) => {
                        if (message !== null) {
                            amqpDebug(`Got ${key} event from AMQP channel`);
                            syncApp.emit('sync-in', message.content);
                        }
                    }, { noAck: true });
                    function publishToQueue(data) {
                        try {
                            const publishResponse = channel.publish(key, queue, Buffer.from(data));
                            amqpDebug(`Publish success: |${publishResponse}| AMQP channel`);
                        }
                        catch (error) {
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
                }
                catch (error) {
                    amqpDebug(`Publish fail: |${error.message}| AMQP channel`);
                    throw error;
                }
            }
        });
        const ready = new Promise((resolve, reject) => {
            channelWrapper.on('close', () => {
                reject(new Error('Channel was closed unexpectedly'));
            });
            channelWrapper.on('connect', () => {
                resolve();
            });
            channelWrapper.on('error', (error) => {
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
//# sourceMappingURL=amqp.js.map