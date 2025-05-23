import { Db } from "mongodb";
declare class MongoPool {
    private static client;
    private static dbPool;
    private constructor();
    private static createConnection;
    static init(): Promise<typeof MongoPool>;
    static db(name: string): Db;
    static close(): Promise<void>;
}
export default MongoPool;
