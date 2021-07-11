import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TransactionDocument = Transaction & mongoose.Document;

@Schema()
export class Transaction {

    @Prop()
    date: Date;

    @Prop()
    productList: [{ _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, count }];

    @Prop()
    total: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.pre<Transaction>('save', async function (next) {

    this.date = new Date();
    next()
})