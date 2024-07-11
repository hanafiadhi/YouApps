import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Profile,
  ProfileDocument,
} from '../src/profile/entities/profile.entity';
import { Model } from 'mongoose';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Profile.name)
    private readonly volunteerModel: Model<ProfileDocument>,
  ) {}

  async pingMongoDB(): Promise<string> {
    try {
      const volunteers = await this.volunteerModel.find().exec();

      return 'MongoDB ping successful';
    } catch (error) {
      console.error('MongoDB ping failed:', error);
      throw error;
    }
  }
}
