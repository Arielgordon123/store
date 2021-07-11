import { PartialType } from '@nestjs/mapped-types';
import { ObjectID } from 'mongodb';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    id: ObjectID;

}
