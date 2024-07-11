import { PartialType } from '@nestjs/mapped-types';
import { CreateVolunteerDto } from './create-profile.dto';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';
import { ApiHideProperty, PartialType as Partial } from '@nestjs/swagger';

export class UpdateVolunteerDto extends PartialType(CreateVolunteerDto) {}
export class UpdateProfilBody extends Partial(CreateVolunteerDto) {}
export class UdateVolunteerPayload {
  updateVolunteerDto: UpdateVolunteerDto;
}
