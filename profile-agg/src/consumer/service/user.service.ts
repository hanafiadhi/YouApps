import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { UserClientService } from '../use-case/user.use-case';
import { USER_SERVICE } from '@app/common';
import { UserMessagePattern } from '../../common/message-pattern/user-client.pattern';

@Injectable()
export class UserService implements UserClientService {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  async updateManybyFilter(payload: object): Promise<any> {
    return await firstValueFrom(
      this.userClient.emit(UserMessagePattern.UPDATEMANY, payload),
    );
  }

  async updateUser(paylaod: { userId: string; data: any }): Promise<any> {
    return await firstValueFrom(
      this.userClient.send(UserMessagePattern.UPDATE, paylaod),
    );
  }

  async removeMany(payload: object): Promise<any> {
    return await firstValueFrom(
      this.userClient.emit(UserMessagePattern.REMOVEMANY, payload),
    );
  }
  async remove(_id: string): Promise<any> {
    return await firstValueFrom(
      this.userClient.emit(UserMessagePattern.REMOVE, _id),
    );
  }

  async createUser(signUpDto: any): Promise<any> {
    return await firstValueFrom(
      this.userClient.send(UserMessagePattern.CREATE, signUpDto),
    );
  }

  async changePassword(data: { _id: string; password: string }): Promise<any> {
    return await firstValueFrom(
      this.userClient.send(UserMessagePattern.CHANGEPASSWORD, data),
    );
  }
}
