import { Injectable } from '@nestjs/common';
import { PayloadRedis } from './dto/create-jwt.dto';
import { RedisRepository } from '../providers/database/redis/abstract.service';

@Injectable()
export class JwtService {
  constructor(private readonly redisAbstract: RedisRepository) {}
  create({ key, value }: PayloadRedis) {
    return this.redisAbstract.saveOrUpdateObject(0, key, value);
  }

  findOne({ key }: PayloadRedis) {
    return this.redisAbstract.getObject(0, key);
  }

  remove({ key }: PayloadRedis) {
    return this.redisAbstract.deleteObject(0, key);
  }
}
