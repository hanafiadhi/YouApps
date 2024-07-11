import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-profile.dto';
import { UpdateVolunteerDto } from './dto/update-profile.dto';

import { UserClientService } from '../consumer/use-case/user.use-case';
import { ProfileClientService } from '../consumer/use-case/profile.use-case';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class VolunteerService {
  constructor(
    private readonly userClientService: UserClientService,
    private readonly volunteerClientService: ProfileClientService,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async create(createProfile: any) {
    try {
      return await this.volunteerClientService.create(createProfile);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: any) {
    return await this.volunteerClientService.findAll(query);
  }

  async findOne(id: string) {
    try {
      const one = await this.volunteerClientService.findOne(id);
      if (!one) {
        throw new NotFoundException('volunteer tidak di temukan');
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(updateVolunteerDto: UpdateVolunteerDto) {
    /** create */
    try {
      const updateVolunteer =
        await this.volunteerClientService.update(updateVolunteerDto);
      return updateVolunteer;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const { deleted } = await this.volunteerClientService.remove(id);
    if (deleted == 0) throw new NotFoundException('Data tidak ditemukan');
    const volunteer = await this.volunteerClientService.findOne(id);
    if (volunteer['user_id']) {
      await this.userClientService.remove(volunteer['user_id']);
    }
  }
}
