import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly logger = new Logger();

  async seed() {
    try {
    } catch (error) {
      this.logger.error(error);
    }
  }
}
