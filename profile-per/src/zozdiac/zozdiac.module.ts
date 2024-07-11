import { Module } from '@nestjs/common';
import { ZozdiacService } from './zozdiac.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Zodiac, ZodiacSchema } from './entities/zodiac.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Zodiac.name,
        schema: ZodiacSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [ZozdiacService],
  exports: [ZozdiacService],
})
export class ZozdiacModule {}
