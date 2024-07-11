import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('application-per')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-application')
  async create(@Payload() payload: any): Promise<any> {
    return this.appService.create(payload);
  }

  @MessagePattern('get-application-list')
  async getApplicationList(@Payload() payload: any) {
    return this.appService.findAll(payload);
  }

  @MessagePattern('get-application')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.appService.get(payload);
  }

  @MessagePattern('delete-application')
  async delete(@Payload() applicationId: string) {
    return this.appService.delete(applicationId);
  }

  @MessagePattern('update-application')
  async update(@Payload() payload: any) {
    return this.appService.update(payload);
  }
}
