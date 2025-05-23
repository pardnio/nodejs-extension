import { Db } from "mongodb";
import { ResultSetHeader } from "mysql2/promise";

export type QueryTarget = "read" | "write";

export interface MySQLPoolConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
  charset?: string;
  connectionLimit?: number;
  waitForConnections?: boolean;
}

export declare class MySQLPool {
  static init(): Promise<void>;
  static close(): Promise<void>;
  static table(tableName: string, target?: "read" | "write"): typeof MySQLPool;
  static total(): typeof MySQLPool;
  static select(...fields: string[]): typeof MySQLPool;
  static innerJoin(table: string, first: string, operator: string, second?: string): typeof MySQLPool;
  static leftJoin(table: string, first: string, operator: string, second?: string): typeof MySQLPool;
  static rightJoin(table: string, first: string, operator: string, second?: string): typeof MySQLPool;
  static where(column: string, operator: any, value?: any): typeof MySQLPool;
  static orderBy(column: string, direction?: "ASC" | "DESC" | "asc" | "desc"): typeof MySQLPool;
  static limit(num: number): typeof MySQLPool;
  static offset(num: number): typeof MySQLPool;
  static increase(target: string, number?: number): typeof MySQLPool;
  static get<T = any>(): Promise<T[]>;
  static insert(data: Record<string, any>): Promise<number | null>;
  static update(data?: Record<string, any>): Promise<ResultSetHeader>;
  static upsert(data: Record<string, any>, updateData?: Record<string, any> | string): Promise<number | null>;
  static query<T = any>(query: string, params?: any[], target?: QueryTarget): Promise<T>;
  static read<T = any>(query: string, params?: any[]): Promise<T>;
  static write<T = any>(query: string, params?: any[]): Promise<T>;
}

export declare class MongoPool {
  static init(): Promise<typeof MongoPool>;
  static db(name: string): Db;
  static close(): Promise<void>;
}

export declare class MongoPool {
  static init(): Promise<typeof MongoPool>;
  static db(name: string): Db;
  static close(): Promise<void>;
}

export declare const redisSession: any;
export declare const redisRefreshData: any;
export declare const resultCache: any;

declare const GetFingerprint: (req: any) => Promise<any>;

declare const isLink: (str: string) => boolean;
declare const isYT: (str: string) => boolean;
declare const isEmail: (str: string) => boolean;
declare const isZH: (str: string) => boolean;
declare const isPhone: (str: string) => boolean;

declare const _default: {
  MySQLPool: typeof MySQLPool;
  MongoPool: typeof MongoPool;
  redisSession: any;
  redisRefreshData: any;
  resultCache: any;
  Mailer: {
    cloud: any;
    host: any;
  };
  GetFingerprint: (req: any) => Promise<any>;
  CheckType: {
    isLink: (str: string) => boolean;
    isYT: (str: string) => boolean;
    isEmail: (str: string) => boolean;
    isZH: (str: string) => boolean;
    isPhone: (str: string) => boolean;
  };
};

export default _default;