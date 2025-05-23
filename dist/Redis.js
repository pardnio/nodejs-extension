"use strict";
// TODO refactor this by using v4.
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultCache = exports.redisRefreshData = exports.redisSession = void 0;
var redis = require("redis");
var promisify = require("util").promisify;
var host = (process.env.REDIS_HOST || "").trim();
var port = parseInt(process.env.REDIS_PORT || "6379") || 6379;
var password = (process.env.REDIS_PASSWORD || "");
function createConnection(db) {
    var client = redis.createClient({
        host: host,
        port: port,
        password: password,
        db: db,
    });
    // Promisify Redis client methods
    client.getAsync = promisify(client.get).bind(client);
    client.setAsync = promisify(client.set).bind(client);
    client.ttlAsync = promisify(client.ttl).bind(client);
    client.expireAsync = promisify(client.expire).bind(client);
    client.delAsync = promisify(client.del).bind(client);
    return client;
}
;
exports.redisSession = createConnection(0);
exports.redisRefreshData = createConnection(1);
exports.resultCache = createConnection(2);
