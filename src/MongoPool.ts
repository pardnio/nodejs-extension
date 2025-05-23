import { Db, MongoClient, MongoClientOptions } from "mongodb";

class MongoPool {
  private static client: MongoClient | null = null;
  private static dbPool: Record<string, Db> = {};

  private constructor() { }

  private static createConnection(dbName: string): MongoClient {
    const protocol = (process.env.MONGO_PROTOCOL || "mongodb").trim();
    const uri = (process.env.MONGO_URI || "").trim();
    const host = (process.env.MONGO_HOST || "localhost").trim();
    const port = process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT) : null;
    const username = (process.env.MONGO_USERNAME || "").trim();
    const password = (process.env.MONGO_PASSWORD || "").trim();
    const retryWrites = process.env.MONGO_RETRY_WRITES === "true";
    const writeConcern = (process.env.MONGO_WRITE_CONCERN || "").trim();
    const appName = (process.env.MONGO_APP_NAME || "").trim();

    let connectionUri: string;

    if (uri) {
      connectionUri = uri;
    }
    else {
      const portPart = protocol === "mongodb+srv" ? "" : `:${port || 27017}`;

      connectionUri = `${protocol}://${username ? `${username}:${encodeURIComponent(password)}@` : ''}${host}${portPart}/${dbName}`;

      const params: string[] = [];
      if (retryWrites !== undefined) {
        params.push(`retryWrites=${retryWrites}`);
      };
      if (writeConcern) {
        params.push(`w=${writeConcern}`);
      };
      if (appName) {
        params.push(`appName=${appName}`);
      };
      if (params.length > 0) {
        connectionUri += `?${params.join("&")}`;
      };
    };

    const options: MongoClientOptions = {
      maxPoolSize: 50,
      minPoolSize: 10,
      maxConnecting: 10,
      maxIdleTimeMS: 60000,

      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,
      noDelay: true,

      heartbeatFrequencyMS: 10000,
    };

    return new MongoClient(connectionUri, options);
  };

  public static async init(): Promise<typeof MongoPool> {
    if (this.client === null) {
      try {
        this.client = this.createConnection("");
        await this.client.connect();

        this.client.on("error", (err: Error) => {
          throw err;
        });
      }
      catch (err) {
        console.error("MongoDB initialization failed:", err);
        throw err;
      };
    };
    return this;
  };

  public static db(name: string): Db {
    if (!this.client) {
      throw new Error('MongoDB client is not initialized.');
    };

    if (!this.dbPool[name]) {
      this.dbPool[name] = this.client.db(name);
    };

    return this.dbPool[name];
  };

  public static async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.dbPool = {};
    };
  };
};

process.on("SIGINT", async _ => {
  await MongoPool.close();
  process.exit(0);
});

process.on("SIGTERM", async _ => {
  await MongoPool.close();
  process.exit(0);
});

export default MongoPool;