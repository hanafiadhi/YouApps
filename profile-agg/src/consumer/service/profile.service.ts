import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IProfilSchema, PROFILE_SERVICE } from '@app/common';
import { ProfileClientService } from '../use-case/profile.use-case';

import { CreateVolunteerDto } from '../../profile/dto/create-profile.dto';
import { firstValueFrom } from 'rxjs';
import { ProfileMessagePattern } from '../../common/message-pattern/profile-client.pattern';
import { UpdateVolunteerDto } from '../../profile/dto/update-profile.dto';

@Injectable()
export class ProfileConsumer implements ProfileClientService {
  constructor(
    @Inject(PROFILE_SERVICE) private readonly volunteerClient: ClientProxy,
  ) {}
  async updateManyByFilter(payload: object): Promise<any> {
    return await firstValueFrom(
      this.volunteerClient.emit(ProfileMessagePattern.UPDATEMANY, payload),
    );
  }

  async removeMany(payload: object): Promise<any> {
    return await firstValueFrom(
      this.volunteerClient.send(ProfileMessagePattern.REMOVEMANY, payload),
    );
  }
  async findAll(query: any): Promise<any | Error> {
    return await firstValueFrom(
      this.volunteerClient.send(ProfileMessagePattern.FINDALL, query),
    );
  }
  async findOne(_id: string): Promise<IProfilSchema | Error> {
    return await firstValueFrom(
      this.volunteerClient.send(ProfileMessagePattern.FINDONE, { _id }),
    );
  }
  async update(
    updateVolunteerDto: UpdateVolunteerDto,
  ): Promise<IProfilSchema | Error> {
    return await firstValueFrom(
      this.volunteerClient.send(
        ProfileMessagePattern.UPDATE,
        updateVolunteerDto,
      ),
    );
  }
  async remove(_id: string): Promise<any> {
    return await firstValueFrom(
      this.volunteerClient.send(ProfileMessagePattern.REMOVE, { _id }),
    );
  }

  async create(createVolunteerDto: CreateVolunteerDto): Promise<IProfilSchema> {
    return await firstValueFrom(
      this.volunteerClient.send(
        ProfileMessagePattern.CREATE,
        createVolunteerDto,
      ),
    );
  }
}
