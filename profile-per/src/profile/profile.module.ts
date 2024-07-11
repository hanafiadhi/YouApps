import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { HoroscopeModule } from '../horoscope/horoscope.module';
import { HoroscopeService } from '../horoscope/horoscope.service';
import { ZozdiacModule } from '../zozdiac/zozdiac.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
    ]),
    HoroscopeModule,
    ZozdiacModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
