import { Types } from 'mongoose';
import { IProfilSchema } from '../../common/interface/volunteer.interface';

export class CreateProfile implements IProfilSchema {
  name: string;
  gender: string;
  birt_date: Date;
  horoscope: string;
  zodiac: string;
  height: string;
  weight: string;
  is_active: boolean;
  user_id: Types.ObjectId;
  interest: string[];
}
