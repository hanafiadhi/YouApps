import { Document, HydratedDocument, Types } from 'mongoose';
import { IProfilSchema } from '../../common/interface/volunteer.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Schema({
  collection: 'profile',
  strict: 'throw',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Profile extends Document implements IProfilSchema {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  gender: string;

  @Prop({
    required: true,
    type: Date,
  })
  birt_date: Date;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  horoscope: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  zodiac: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  height: string;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  weight: string;

  @Prop({
    required: false,
    type: [],
  })
  interest: string[];

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  is_active: boolean;

  @Prop({
    required: false,
    type: String,
    default: null,
  })
  user_id: Types.ObjectId;
}

export type ProfileDocument = HydratedDocument<Profile>;

enum $languange {
  IN = '+62',
}
let language: string | boolean = '';
export const ProfileSchema = SchemaFactory.createForClass(Profile)
  .plugin(softDeletePlugin)
  .pre('find', function (next) {
    const { languages } = this.getQuery();
    if (languages) {
      language = languages;
      delete this.getQuery().blazz;
    }
    next();
  })
  .post('find', function (docs, next) {
    if (language && language === $languange.IN) {
      docs.forEach((doc) => {
        if (doc.whatsapp) {
          doc.whatsapp = `+62${doc.whatsapp.slice(1)}`;
        }
      });
      language = false;
    }
    next();
  });
