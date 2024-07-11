import { Injectable } from '@nestjs/common';
import { IProfilSchema } from '../../common/interface/volunteer.interface';
import { CreateVolunteerDto } from '../../profile/dto/create-profile.dto';
import { UpdateVolunteerDto } from '../../profile/dto/update-profile.dto';

@Injectable()
export abstract class ProfileClientService {
  abstract findAll(query: any): Promise<any | Error>;

  abstract updateManyByFilter(payload: object): Promise<any | Error>;

  abstract findOne(_id: string): Promise<IProfilSchema | null | Error>;

  abstract update(
    updateVolunteerDto: UpdateVolunteerDto,
  ): Promise<IProfilSchema | Error>;

  abstract remove(_id: string): Promise<any | Error>;

  abstract removeMany(payload: object): Promise<any | Error>;

  abstract create(
    createVolunteerDto: CreateVolunteerDto,
  ): Promise<IProfilSchema>;
}
