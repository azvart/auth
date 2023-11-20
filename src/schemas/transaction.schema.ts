import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  public to: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  public from: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  public user: Types.ObjectId;

  @Prop({ required: true })
  public value: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'wallet' })
  public wallet: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
