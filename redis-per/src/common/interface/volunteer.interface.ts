import { Types } from 'mongoose';

export interface IVolunteerSchema {
  name: string;
  whatsapp: string;
  gender: string;
  birt_date: Date;
  address: string;
  is_active: boolean;
  profile: string | null;
  profile_url: string | null;
  user_id: Types.ObjectId;
  tenant_id: string;

  province_id: Types.ObjectId;
  province_name: string;
  city_id: Types.ObjectId | null;
  city_name: string | null;
  district_id: Types.ObjectId | null;
  district_name: string | null;
  sub_disctrict_id: Types.ObjectId | null;
  sub_disctrict_name: string | null;
  volunteer_code: string;

  assignment_province_id: Types.ObjectId;
  assignment_province_name: string;
  assignment_city_id: Types.ObjectId | null;
  assignment_city_name: string | null;
  assignment_district_id: Types.ObjectId | null;
  assignment_district_name: string | null;
  assignment_sub_disctrict_id: Types.ObjectId | null;
  assignment_sub_disctrict_name: string | null;
}
