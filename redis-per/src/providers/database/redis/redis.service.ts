import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CLIENT_JWT, REDIS_CLIENT_USER } from './redis.provider';
import { RedisRepository } from './abstract.service';

@Injectable()
export class RedisService implements RedisRepository {
  constructor(
    @Inject(REDIS_CLIENT_JWT) private readonly redisClientJwt: Redis.Redis,
    @Inject(REDIS_CLIENT_USER) private readonly redisClientUser: Redis.Redis,
  ) {}

  async pingRedis(dbIndex: number): Promise<any> {
    return await this.getClient(dbIndex).ping();
  }

  getClient(dbIndex: number): Redis.Redis {
    if (dbIndex === 0) {
      return this.redisClientJwt;
    } else if (dbIndex === 2) {
      return this.redisClientUser;
    } else {
      throw new Error('Invalid Redis DB index');
    }
  }

  async saveOrUpdateObject(
    dbIndex: number,
    key: string,
    value: any,
  ): Promise<any> {
    const client = this.getClient(dbIndex);
    return await client.set(key, JSON.stringify(value));
  }

  async getObject(dbIndex: number, key: string): Promise<string | null> {
    const client = this.getClient(dbIndex);
    const result = await client.get(key);
    return result ? JSON.parse(result) : null;
  }

  async deleteObject(dbIndex: number, key: string): Promise<number> {
    const client = this.getClient(dbIndex);
    return await client.del(key);
  }
}
