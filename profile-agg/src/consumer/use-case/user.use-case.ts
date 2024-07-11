import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserClientService {
  abstract createUser(signUpDto: any): Promise<any>;

  abstract remove(_id: string): Promise<any>;

  abstract changePassword(data: {
    _id: string;
    password: string;
  }): Promise<any>;

  abstract removeMany(payload: object): Promise<any | Error>;

  abstract updateUser(paylaod: { userId: string; data: any }): Promise<any>;
  abstract updateManybyFilter(payload: object): Promise<any>;
}
