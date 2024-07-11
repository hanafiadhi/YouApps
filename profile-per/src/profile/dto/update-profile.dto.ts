import { PartialType } from '@nestjs/mapped-types';
import { CreateProfile } from './create-profile.dto';
import { Types } from 'mongoose';

export class UpdateProfileDto extends PartialType(CreateProfile) {}

export class UpdateVolunteerPayload {
  updateVolunteerDto: UpdateProfileDto;
}
