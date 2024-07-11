import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../../common/validator/match.validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Match('password', { message: 'confirm_password does not match password' })
  confirm_password: string;

  @ApiHideProperty()
  applications: Array<string>;
  @ApiHideProperty()
  role: Array<string>;
}
