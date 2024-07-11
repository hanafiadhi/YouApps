import { PartialType } from '@nestjs/mapped-types';
import { PayloadRedis } from './create-jwt.dto';

export class UpdateJwtDto extends PartialType(PayloadRedis) {}
