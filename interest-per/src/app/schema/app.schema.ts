import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes } from 'mongoose';
import { IApplicationSchema } from 'src/common/interface/application.interface';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Schema({
  collection: `interest`,
  strict: 'throw',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Application extends Document implements IApplicationSchema {
  @Prop({
    required: true,
    index: { partialFilterExpression: { isDeleted: false }, unique: true },
  })
  name: string;
}

export type ApplicationDocument = HydratedDocument<Application>;

export const ApplicationSchema =
  SchemaFactory.createForClass(Application).plugin(softDeletePlugin);
