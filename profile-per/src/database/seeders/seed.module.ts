import { Module } from '@nestjs/common';
import { SeedService } from './data.seed';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../../profile/entities/profile.entity';
import {
  Horoscope,
  HoroscopeSchema,
} from '../../horoscope/entities/zodiac.entity';
import { Zodiac, ZodiacSchema } from '../../zozdiac/entities/zodiac.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Horoscope.name,
        schema: HoroscopeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Zodiac.name,
        schema: ZodiacSchema,
      },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
