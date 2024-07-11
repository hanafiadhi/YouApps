import { Module } from '@nestjs/common';
import { HoroscopeService } from './horoscope.service';
import { Horoscope, HoroscopeSchema } from './entities/zodiac.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Horoscope.name,
        schema: HoroscopeSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [HoroscopeService],
  exports: [HoroscopeService],
})
export class HoroscopeModule {}
