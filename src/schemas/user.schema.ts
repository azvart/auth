import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: 'New User' })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ default: false })
  public isAdmin: boolean;

  @Prop({ default: false })
  public isNewUser: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
