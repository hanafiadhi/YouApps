import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfile } from './dto/create-profile.dto';
import {
  UpdateProfileDto,
  UpdateVolunteerPayload,
} from './dto/update-profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IdMongo } from '../common/interface/_id.interface';

@Controller('profile-per')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('create-profile')
  create(@Payload() createProfile: CreateProfile) {
    return this.profileService.create(createProfile);
  }

  @MessagePattern('find-all-profile')
  findAll(@Payload() query: any) {
    return this.profileService.findAll(query);
  }

  @MessagePattern('find-one-profile')
  findOne(@Payload() { _id }: IdMongo) {
    return this.profileService.findOne(_id);
  }

  @MessagePattern('update-one-profile')
  update(@Payload() updateProfile: UpdateProfileDto) {
    return this.profileService.update(updateProfile);
  }
}
