import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;
import * as mongoose from 'mongoose';
@Schema()
export class Product {

    @Prop()
    name: string;
    
    @Prop()
    price: number;
    
    @Prop()
    desc: string;
    
    @Prop()
    imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);