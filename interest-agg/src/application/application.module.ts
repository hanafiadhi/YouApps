import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { RmqModule } from 'src/providers/queue/rabbitmq/rmq.module';
import { AUTH_QUEUE, INTEREST_QUEUE } from 'src/common/constants/services';

@Module({
  imports: [
    RmqModule.register({ name: INTEREST_QUEUE }),
    RmqModule.register({ name: AUTH_QUEUE }),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
