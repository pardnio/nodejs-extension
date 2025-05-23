// TODO refactor this by using v4.

const redis = require("redis");
const { promisify } = require("util");
const host = (process.env.REDIS_HOST || "").trim();
const port = parseInt(process.env.REDIS_PORT || "6379") || 6379;
const password = (process.env.REDIS_PASSWORD || "");

function createConnection(db: Number) {
  const client = redis.createClient({
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

  return client
};

export const redisSession = createConnection(0);
export const redisRefreshData = createConnection(1);
export const resultCache = createConnection(2);