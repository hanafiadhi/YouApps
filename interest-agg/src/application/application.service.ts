import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { firstValueFrom } from 'rxjs';

import { ClientProxy } from '@nestjs/microservices';
import { INTEREST_QUEUE } from '../common/constants/services';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject(INTEREST_QUEUE) private readonly clientApplication: ClientProxy,
  ) {}

  async create(createApplicationDto: any) {
    const application = await firstValueFrom(
      this.clientApplication.send('create-application', createApplicationDto),
    );
    return application;
  }

  async findAll(payload: any) {
    const getListApplication = await firstValueFrom(
      this.clientApplication.send('get-application-list', payload),
    );
    return getListApplication;
  }

  async findOne(applicationId: string) {
    const getApplication = await firstValueFrom(
      this.clientApplication.send('get-application', applicationId),
    );
    if (!getApplication) throw new NotFoundException('Data not found');
    return getApplication;
  }

  async update(
    applicationId: string,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    const updateApplication = await firstValueFrom(
      this.clientApplication.send('update-application', {
        data: updateApplicationDto,
        applicationId,
      }),
    );
    return updateApplication;
  }

  async remove(applicationId: string) {
    const deleteApplication = await firstValueFrom(
      this.clientApplication.send('delete-application', applicationId),
    );

    if (deleteApplication.deleted == 0)
      throw new NotFoundException('Data not found');
  }
}
