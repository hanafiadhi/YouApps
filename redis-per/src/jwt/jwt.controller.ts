import { Controller, Body } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PayloadRedis } from './dto/create-jwt.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('jwt')
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}

  @MessagePattern('create-jwt')
  createOrUpdate(@Body() createJwtDto: PayloadRedis) {
    return this.jwtService.create(createJwtDto);
  }

  @MessagePattern('find-one-jwt')
  findOne(@Payload() payload: PayloadRedis) {
    return this.jwtService.findOne(payload);
  }

  @MessagePattern('delete-one-jwt')
  remove(@Payload() payload: PayloadRedis) {
    return this.jwtService.remove(payload);
  }
}
