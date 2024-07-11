import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtController } from './jwt.controller';
import { RedisRepository } from '../providers/database/redis/abstract.service';
import { RedisService } from '../providers/database/redis/redis.service';
import { RedisModule } from '../providers/database/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [JwtController],
  providers: [
    {
      provide: RedisRepository,
      useClass: RedisService,
    },
    JwtService,
  ],
})
export class JwtModule {}
