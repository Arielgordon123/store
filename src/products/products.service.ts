import { Injectable } from '@nestjs/common';
import { InjectModel,  Schema as MongooseSchema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: mongoose.Model<ProductDocument>) {}

  create(createProductDto: CreateProductDto) {
    const creaetedProduct = new this.productModel(createProductDto);
    return creaetedProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return this.productModel.findOne(id).exec();
  }

  update(id: mongoose.Schema.Types.ObjectId , updateProductDto: UpdateProductDto) {
    const { _id, ...propsNoId } = updateProductDto;
    return this.productModel.findOneAndUpdate(id, propsNoId, { new: true }).exec()
  }

  remove(id: string|number) {

    return this.productModel.findOneAndDelete({_id: mongoose.Types.ObjectId(id)}).exec();
  }
}
