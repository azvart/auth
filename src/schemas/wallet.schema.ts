import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ required: true })
  public coins: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user', unique: true })
  public user: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'transactions' })
  public transactions: Types.ObjectId;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
