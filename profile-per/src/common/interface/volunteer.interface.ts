import { Types } from 'mongoose';

export interface IProfilSchema {
  name: string;
  gender: string;
  birt_date: Date;
  horoscope: string;
  zodiac: string;
  height: string;
  weight: string;
  is_active: boolean;
  user_id: Types.ObjectId;
  interest: Array<string>;
}
