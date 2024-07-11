import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { ProfileController } from './volunteer.controller';
import { RmqModule } from '../providers/queue/rabbitmq/rmq.module';
import {
  AUTH_SERVICE,
  PROFILE_SERVICE,
  USER_SERVICE,
} from '../common/constants/service-rmq.constant';
import { ProfileConsumer } from '../consumer/service/profile.service';
import { ProfileClientService } from '../consumer/use-case/profile.use-case';
import { UserClientService } from '../consumer/use-case/user.use-case';
import { UserService } from '../consumer/service/user.service';

@Module({
  imports: [
    RmqModule.register({ name: AUTH_SERVICE }),
    RmqModule.register({ name: USER_SERVICE }),
    RmqModule.register({ name: PROFILE_SERVICE }),
  ],
  controllers: [ProfileController],
  providers: [
    VolunteerService,
    { provide: ProfileClientService, useClass: ProfileConsumer },
    { provide: UserClientService, useClass: UserService },
  ],
})
export class VolunteerModule {}
