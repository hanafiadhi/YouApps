import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horoscope, HoroscopeDocument } from './entities/zodiac.entity';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class HoroscopeService {
  constructor(
    @InjectModel(Horoscope.name)
    private readonly horoscopeModel: SoftDeleteModel<HoroscopeDocument>,
  ) {}

  async findHoroscopeByDate(date: Date) {
    try {
      let convert = new Date(date);
      const nowMonth = convert.getUTCMonth() + 1;
      const nowDate = convert.getUTCDate();
      const nowTotal = nowMonth * 30 + nowDate;

      const horoscope = await this.horoscopeModel.aggregate([
        {
          $addFields: {
            startTotal: {
              $add: [
                {
                  $multiply: [{ $month: '$start_date' }, 30],
                },
                {
                  $dayOfMonth: '$start_date',
                },
              ],
            },
            endTotal: {
              $add: [
                {
                  $multiply: [{ $month: '$end_date' }, 30],
                },
                {
                  $dayOfMonth: '$end_date',
                },
              ],
            },
          },
        },
        {
          $match: {
            startTotal: { $lte: nowTotal },
            endTotal: { $gte: nowTotal },
          },
        },
        {
          $project: {
            startTotal: 0,
            endTotal: 0,
          },
        },
      ]);

      return horoscope;
    } catch (error) {
      // Handle error appropriately
      throw new RpcException(error.message); // Example using RpcException as mentioned previously
    }
  }
}
