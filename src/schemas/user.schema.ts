import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ default: 'New User' })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ default: 'user' })
  public role: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'wallet' })
  public wallet: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
