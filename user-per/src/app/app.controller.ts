import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user-per')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-user')
  async create(@Payload() payload: any): Promise<any> {
    return this.appService.create(payload);
  }
  @MessagePattern('find-by-id')
  async findone(@Payload() payload: any): Promise<any> {
    return this.appService.findOne(payload);
  }

  @MessagePattern('get-user-list')
  async getUserList(@Payload() payload: any) {
    return this.appService.findAll(payload);
  }

  @MessagePattern('get-user')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.appService.get(payload);
  }

  @MessagePattern('delete-user')
  async delete(@Payload() userId: string) {
    return this.appService.delete(userId);
  }

  @MessagePattern('delete-user-many')
  async deleteMany(@Payload() payload: object) {
    return this.appService.removeMany(payload);
  }

  @MessagePattern('update-user')
  async update(@Payload() payload: any) {
    return this.appService.update(payload);
  }

  @MessagePattern('find-by-username')
  async findByEmail(@Payload() payload: any) {
    return this.appService.findByIdentifier(payload);
  }

  @MessagePattern('health-check')
  async nice(@Payload() data: any) {
    return data;
  }
}
