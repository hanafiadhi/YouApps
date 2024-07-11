import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../src/profile/entities/profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
    ]),
  ],
  providers: [TestService],
})
export class TestModule {}
