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
    return this.productModel.find({deleted: false}, {deleted: 0}).exec();
  }

  findOne(id: string| number):Promise<Product> {
    return this.productModel.findOne({_id: mongoose.Types.ObjectId(id)}).exec();
  }

  update(id: string| number , updateProductDto: UpdateProductDto) {
    const { _id, ...propsNoId } = updateProductDto;
    return this.productModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, propsNoId, { new: true }).exec()
  }

  remove(id: string|number) {

    return this.productModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {$set: {"deleted":true}}).exec();
  }
}
