"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmq = exports.SYNC = exports.nats = exports.amqp = exports.redis = exports.core = exports.init = void 0;
const url_1 = require("url");
const core_1 = __importStar(require("./core"));
exports.core = core_1.default;
Object.defineProperty(exports, "SYNC", { enumerable: true, get: function () { return core_1.SYNC; } });
const redis_1 = __importDefault(require("./adapters/redis"));
exports.redis = redis_1.default;
const amqp_1 = __importDefault(require("./adapters/amqp"));
exports.amqp = amqp_1.default;
const nats_1 = __importDefault(require("./adapters/nats"));
exports.nats = nats_1.default;
const adaptors = {
    nats: nats_1.default,
    redis: redis_1.default,
    amqp: amqp_1.default,
    rabbitmq: amqp_1.default,
};
const init = (options) => {
    const { uri, deserialize, serialize } = options;
    if (!uri) {
        throw new Error("A `uri` option with the database connection string has to be provided to feathers-sync");
    }
    if (deserialize && typeof deserialize !== "function") {
        throw new Error("`deserialize` option provided to feathers-sync is not a function");
    }
    if (serialize && typeof serialize !== "function") {
        throw new Error("`serialize` option provided to feathers-sync is not a function");
    }
    const { protocol } = new url_1.URL(uri);
    const name = protocol.substring(0, protocol.length - 1);
    const identifiedProtocolName = Object.keys(adaptors).find((adaptor) => name.indexOf(adaptor) !== -1);
    if (!identifiedProtocolName) {
        throw new Error(`${name} is an invalid adapter (uri ${uri})`);
    }
    const adapter = adaptors[identifiedProtocolName];
    return adapter({
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        key: "feathers-sync",
        ...options,
    });
};
exports.init = init;
exports.default = init;
exports.rabbitmq = amqp_1.default;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map