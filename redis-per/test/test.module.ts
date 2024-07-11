import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { RedisRepository } from '../src/providers/database/redis/abstract.service';
import { RedisService } from '../src/providers/database/redis/redis.service';

@Module({
  providers: [
    {
      provide: RedisRepository,
      useClass: RedisService,
    },
    TestService,
  ],
})
export class TestModule {}
