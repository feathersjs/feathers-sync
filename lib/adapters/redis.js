const redis = require("redis");
const debug = require("debug")("feathers-sync:redis");
const core = require("../core");

module.exports = (config) => {
  return (app) => {
    const { key, serialize, deserialize, redisClient, uri } = config;
    const options = {
      url: uri,
      ...config.redisOptions,
    };

    if (!redisClient) {
      debug(`Setting up Redis client for ${options.url}`);
    }

    const pub = redisClient || redis.createClient(options);
    const sub = pub.duplicate();
    const errorHandlers = pub.listeners("error");

    if (errorHandlers.length > 0) {
      // If error handlers exists, copy them to sub
      errorHandlers.forEach((handler) => {
        sub.on("error", handler);
      });
    } else {
      // If not, make sure both pub and sub has an error handler to avoid unhandled rejections
      const defaultErrorHandler = (err) => {
        console.error("REDIS ERROR", err);
      };
      pub.on("error", defaultErrorHandler);
      sub.on("error", defaultErrorHandler);
    }

    const msgFromRedisHandler = (data) => {
      debug(`Got ${key} message from Redis`);
      app.emit("sync-in", data);
    };

    app.configure(core);
    app.sync = {
      deserialize,
      serialize,
      pub,
      sub,
      type: "redis",
      ready: new Promise((resolve, reject) => {
        pub.connect();
        sub.connect();
        sub.once("ready", resolve);
        sub.once("error", reject);
      }).then(() => sub.subscribe(key, msgFromRedisHandler, true)),
    };

    app.on("sync-out", (data) => {
      debug(`Publishing key ${key} to Redis`);
      pub.publish(key, data);
    });
  };
};
