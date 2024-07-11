import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class RedisRepository {
  abstract saveOrUpdateObject(
    dbIndex: number,
    key: string,
    value: any,
  ): Promise<any>;
  abstract getObject(dbIndex: number, key: string): Promise<string | null>;
  abstract deleteObject(dbIndex: number, key: string): Promise<number>;
  abstract pingRedis(dbIndex: number): Promise<any>;
}
