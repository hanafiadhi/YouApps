import { Document, HydratedDocument, Types } from 'mongoose';
import { IProfilSchema } from '../../common/interface/volunteer.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Schema({
  collection: 'horoscope',
  strict: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Horoscope extends Document {
  @Prop({
    type: Date,
  })
  start_date: Date;
  @Prop({
    type: Date,
  })
  end_date: Date;
}

export type HoroscopeDocument = HydratedDocument<Horoscope>;

export const HoroscopeSchema =
  SchemaFactory.createForClass(Horoscope).plugin(softDeletePlugin);
