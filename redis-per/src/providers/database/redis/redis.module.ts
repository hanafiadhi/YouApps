import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { redisProviders } from './redis.provider';

@Global()
@Module({
  providers: [...redisProviders, RedisService],
  exports: [RedisService, ...redisProviders],
})
export class RedisModule {}
