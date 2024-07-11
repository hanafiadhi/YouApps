import { Injectable } from '@nestjs/common';
import { PayloadRedis } from '../../common/interface/payload-redis.interface';

@Injectable()
export abstract class AuthClientService {
  abstract login(payload: PayloadRedis): Promise<any>;
  abstract logout({ key }: PayloadRedis): Promise<string | null>;
}
