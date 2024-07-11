import { Application, ApplicationDocument } from '../app/schema/app.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HashingService } from '../hashing.service';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';

export class SeedService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
    private readonly hashingService: HashingService,
  ) {}
  private readonly logger = new Logger();

  async seed() {
    try {
      const application: Partial<Application> = {
        name: 'coding',
      };

      const findApplication = await this.applicationModel.findOne({
        name: 'coding',
        isDeleted: false,
      });

      if (findApplication) {
        throw new Error('Application sudah dibuat');
      }
      await this.applicationModel
        .create(application)
        .catch((err) => console.log(err));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
