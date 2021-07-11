import { PartialType } from '@nestjs/mapped-types';
import * as mongoose from 'mongoose';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    _id:  mongoose.Schema.Types.ObjectId;

}
