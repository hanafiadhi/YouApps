import * as Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

const RedisClient = Redis.default;
export const REDIS_CLIENT_JWT = 'REDIS_CLIENT_JWT';
export const REDIS_CLIENT_USER = 'REDIS_CLIENT_USER';

export const redisProviders: Provider[] = [
  {
    provide: REDIS_CLIENT_JWT,
    useFactory: (configService: ConfigService): Redis.Redis => {
      const redisHost: string = configService.get<string>(
        'database.redis.host',
      );
      const redisPort: number = parseInt(
        configService.get<string>('database.redis.port'),
        10,
      );
      const username: string = configService.get<string>(
        'database.redis.username',
      );
      const password: string = configService.get<string>(
        'database.redis.password',
      );
      return new RedisClient({
        host: redisHost,
        port: redisPort,
        username: username,
        password: password,
        db: 0,
      });
    },
    inject: [ConfigService],
  },
  {
    provide: REDIS_CLIENT_USER,
    useFactory: (configService: ConfigService): Redis.Redis => {
      const redisHost: string = configService.get<string>(
        'database.redis.host',
      );
      const redisPort: number = parseInt(
        configService.get<string>('database.redis.port'),
        10,
      );
      const username: string = configService.get<string>(
        'database.redis.username',
      );
      const password: string = configService.get<string>(
        'database.redis.password',
      );
      return new RedisClient({
        host: redisHost,
        port: redisPort,
        username: username,
        password: password,
        db: 0,
      });
    },
    inject: [ConfigService],
  },
];
