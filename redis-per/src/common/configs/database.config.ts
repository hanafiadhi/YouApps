import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    host: process.env.DATABASE_HOST || null,
    name: process.env.DATABASE_NAME || null,
    user: process.env.DATABASE_USER || null,
    password: process.env.DATABASE_PASSWORD || null,
    debug: process.env.DATABASE_DEBUG === 'true' || false,
    options: process.env.DATABASE_OPTIONS,

    redis: {
      port: process.env.REDIS_PORT || null,
      host: process.env.REDIS_HOST || null,
      username: process.env.REDIS_USERNAME || null,
      password: process.env.REDIS_PASSWORD || null,
    },
  }),
);
