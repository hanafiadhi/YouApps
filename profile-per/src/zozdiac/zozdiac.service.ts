import { Injectable } from '@nestjs/common';
import { Zodiac } from './entities/zodiac.entity';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ZozdiacService {
  constructor(
    @InjectModel(Zodiac.name)
    private readonly zodiacModel: SoftDeleteModel<Zodiac>,
  ) {}

  async findHoroscopeByDate(date: Date): Promise<any> {
    const zodiac = await this.zodiacModel
      .findOne(
        {
          $and: [{ start_date: { $lte: date } }, { end_date: { $gte: date } }],
        },
        { zodiac: 1 },
      )
      .lean();
    return zodiac;
  }
}
