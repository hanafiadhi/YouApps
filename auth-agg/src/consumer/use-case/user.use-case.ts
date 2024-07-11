import { Injectable } from '@nestjs/common';
import { IUpdateTfaUser } from 'src/common/interface/user-client.interface';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';

@Injectable()
export abstract class UserClientService {
  abstract findById(_id: string): Promise<any>;
  abstract findByEmail(email: string): Promise<any>;
  abstract createUser(signUpDto: SignUpDto): Promise<any>;
  abstract changePassword(data: {
    userId: string;
    data: Object;
  }): Promise<any>;
  abstract updateTfaforUser(payload: IUpdateTfaUser): Promise<any>;
  abstract findByUsername(username: string): Promise<any>;
}
