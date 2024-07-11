import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Profile } from '../../profile/entities/profile.entity';
import { Horoscope } from '../../horoscope/entities/zodiac.entity';
import { Zodiac } from '../../zozdiac/entities/zodiac.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Horoscope.name)
    private readonly horoscopeModel: Model<Horoscope>,
    @InjectModel(Zodiac.name)
    private readonly zodiacModel: Model<Zodiac>,
  ) {}
  private readonly logger = new Logger();

  async seed() {
    try {
      await this.horoscopeModel
        .insertMany([
          {
            horoscope: '♈ Aries (Ram)',
            start_date: new Date('2024-03-21T00:00:00.000Z'),
            end_date: new Date('2024-04-19T00:00:00.000Z'),
          },
          {
            horoscope: '♉ Taurus (Bull)',
            start_date: new Date('2024-04-20T00:00:00.000Z'),
            end_date: new Date('2024-05-20T00:00:00.000Z'),
          },
          {
            horoscope: '♊ Gemini (Twins)',
            start_date: new Date('2024-05-21T00:00:00.000Z'),
            end_date: new Date('2024-06-21T00:00:00.000Z'),
          },
          {
            horoscope: '♋ Cancer (Crab)',
            start_date: new Date('2024-06-22T00:00:00.000Z'),
            end_date: new Date('2024-07-22T00:00:00.000Z'),
          },
          {
            horoscope: '♌ Leo (Lion)',
            start_date: new Date('2024-07-23T00:00:00.000Z'),
            end_date: new Date('2024-08-22T00:00:00.000Z'),
          },
          {
            horoscope: '♍ Virgo (Virgin)',
            start_date: new Date('2024-08-23T00:00:00.000Z'),
            end_date: new Date('2024-09-22T00:00:00.000Z'),
          },
          {
            horoscope: '♎ Libra (Balance)',
            start_date: new Date('2024-09-23T00:00:00.000Z'),
            end_date: new Date('2024-10-23T00:00:00.000Z'),
          },
          {
            horoscope: '♏ Scorpius (Scorpion)',
            start_date: new Date('2024-10-24T00:00:00.000Z'),
            end_date: new Date('2024-11-21T00:00:00.000Z'),
          },
          {
            horoscope: '♐ Sagittarius (Archer)',
            start_date: new Date('2024-11-22T00:00:00.000Z'),
            end_date: new Date('2024-12-21T00:00:00.000Z'),
          },
          {
            horoscope: '♑ Capricornus (Goat)',
            start_date: new Date('2024-12-22T00:00:00.000Z'),
            end_date: new Date('2025-01-19T00:00:00.000Z'),
          },
          {
            horoscope: '♒ Aquarius (Water Bearer)',
            start_date: new Date('2025-01-20T00:00:00.000Z'),
            end_date: new Date('2025-02-18T00:00:00.000Z'),
          },
          {
            horoscope: '♓ Pisces (Fish)',
            start_date: new Date('2025-02-19T00:00:00.000Z'),
            end_date: new Date('2025-03-20T00:00:00.000Z'),
          },
        ])
        .catch((err) => this.logger.error(err));
      await this.zodiacModel
        .insertMany([
          {
            start_date: new Date('2023-01-22T00:00:00.000Z'),
            end_date: new Date('2024-02-09T00:00:00.000Z'),
            zodiac: 'Rabbit',
          },
          {
            start_date: new Date('2022-02-01T00:00:00.000Z'),
            end_date: new Date('2023-01-21T00:00:00.000Z'),
            zodiac: 'Tiger',
          },
          {
            start_date: new Date('2021-02-12T00:00:00.000Z'),
            end_date: new Date('2022-01-31T00:00:00.000Z'),
            zodiac: 'Ox',
          },
          {
            start_date: new Date('2020-01-25T00:00:00.000Z'),
            end_date: new Date('2021-02-11T00:00:00.000Z'),
            zodiac: 'Rat',
          },
          {
            start_date: new Date('2019-02-05T00:00:00.000Z'),
            end_date: new Date('2020-01-24T00:00:00.000Z'),
            zodiac: 'Pig',
          },
          {
            start_date: new Date('2018-02-16T00:00:00.000Z'),
            end_date: new Date('2019-02-04T00:00:00.000Z'),
            zodiac: 'Dog',
          },
          {
            start_date: new Date('2017-01-28T00:00:00.000Z'),
            end_date: new Date('2018-02-15T00:00:00.000Z'),
            zodiac: 'Rooster',
          },
          {
            start_date: new Date('2016-02-08T00:00:00.000Z'),
            end_date: new Date('2017-01-27T00:00:00.000Z'),
            zodiac: 'Monkey',
          },
          {
            start_date: new Date('2015-02-19T00:00:00.000Z'),
            end_date: new Date('2016-02-07T00:00:00.000Z'),
            zodiac: 'Goat',
          },
          {
            start_date: new Date('2014-01-31T00:00:00.000Z'),
            end_date: new Date('2015-02-18T00:00:00.000Z'),
            zodiac: 'Horse',
          },
          {
            start_date: new Date('2013-02-10T00:00:00.000Z'),
            end_date: new Date('2014-01-30T00:00:00.000Z'),
            zodiac: 'Snake',
          },
          {
            start_date: new Date('2012-01-23T00:00:00.000Z'),
            end_date: new Date('2013-02-09T00:00:00.000Z'),
            zodiac: 'Dragon',
          },
          {
            start_date: new Date('2011-02-03T00:00:00.000Z'),
            end_date: new Date('2012-01-22T00:00:00.000Z'),
            zodiac: 'Rabbit',
          },
          {
            start_date: new Date('2010-02-14T00:00:00.000Z'),
            end_date: new Date('2011-02-02T00:00:00.000Z'),
            zodiac: 'Tiger',
          },
          {
            start_date: new Date('2009-01-26T00:00:00.000Z'),
            end_date: new Date('2010-02-13T00:00:00.000Z'),
            zodiac: 'Ox',
          },
          {
            start_date: new Date('2008-02-07T00:00:00.000Z'),
            end_date: new Date('2009-01-25T00:00:00.000Z'),
            zodiac: 'Rat',
          },
          {
            start_date: new Date('2007-02-18T00:00:00.000Z'),
            end_date: new Date('2008-02-06T00:00:00.000Z'),
            zodiac: 'Boar',
          },
          {
            start_date: new Date('2006-01-29T00:00:00.000Z'),
            end_date: new Date('2007-02-17T00:00:00.000Z'),
            zodiac: 'Dog',
          },
          {
            start_date: new Date('2005-02-09T00:00:00.000Z'),
            end_date: new Date('2006-01-28T00:00:00.000Z'),
            zodiac: 'Rooster',
          },
          {
            start_date: new Date('2004-01-22T00:00:00.000Z'),
            end_date: new Date('2005-02-08T00:00:00.000Z'),
            zodiac: 'Monkey',
          },
          {
            start_date: new Date('2003-02-01T00:00:00.000Z'),
            end_date: new Date('2004-01-21T00:00:00.000Z'),
            zodiac: 'Goat',
          },
          {
            start_date: new Date('2002-02-12T00:00:00.000Z'),
            end_date: new Date('2003-01-31T00:00:00.000Z'),
            zodiac: 'Horse',
          },
          {
            start_date: new Date('2001-01-24T00:00:00.000Z'),
            end_date: new Date('2002-02-11T00:00:00.000Z'),
            zodiac: 'Snake',
          },
          {
            start_date: new Date('2000-02-05T00:00:00.000Z'),
            end_date: new Date('2001-01-23T00:00:00.000Z'),
            zodiac: 'Dragon',
          },
          {
            start_date: new Date('1999-02-16T00:00:00.000Z'),
            end_date: new Date('2000-02-04T00:00:00.000Z'),
            zodiac: 'Rabbit',
          },
          {
            start_date: new Date('1998-01-28T00:00:00.000Z'),
            end_date: new Date('1999-02-15T00:00:00.000Z'),
            zodiac: 'Tiger',
          },
          {
            start_date: new Date('1997-02-07T00:00:00.000Z'),
            end_date: new Date('1998-01-27T00:00:00.000Z'),
            zodiac: 'Ox',
          },
          {
            start_date: new Date('1996-02-19T00:00:00.000Z'),
            end_date: new Date('1997-02-06T00:00:00.000Z'),
            zodiac: 'Rat',
          },
        ])
        .catch((err) => this.logger.error(err));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
