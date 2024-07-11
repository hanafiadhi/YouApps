import { Injectable } from '@nestjs/common';
import { RedisRepository } from '../src/providers/database/redis/abstract.service';

@Injectable()
export class TestService {
  constructor(private readonly redisAbstract: RedisRepository) {}
  async pingMongoDB() {
    return await this.redisAbstract.pingRedis(0);
  }
}
