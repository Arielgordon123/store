import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
   
    @Prop()
    date: Date;

    @Prop()
    productList: [{_id, count}]
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
// TransactionSchema.pre('save', function (next) {
//     console.log('this :>> ', this);
//     next()
//   })