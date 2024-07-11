import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IProfilSchema } from '../../common/interface/volunteer.interface';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateVolunteerDto implements Partial<IProfilSchema> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  birt_date: Date;

  @ApiHideProperty()
  user_id: string;
  @ApiHideProperty()
  horoscope?: string;
  @ApiHideProperty()
  zodiac?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  height: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  interest: Array<string>;
}
