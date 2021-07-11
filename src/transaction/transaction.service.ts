import { Injectable } from '@nestjs/common';
import { InjectModel, Schema as MongooseSchema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ProductsService } from 'src/products/products.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(@InjectModel(Transaction.name) private transactionModel: mongoose.Model<TransactionDocument>, private productService: ProductsService) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const productList = createTransactionDto.products.map(transaction => {
      return {
        '_id': mongoose.Types.ObjectId(transaction._id),
        'count': transaction.count
      }
    })

    let prices = productList.map(async item => {
      let price = (await this.productService.findOne(item._id.toString())).price
      return price * item.count
    });

    Promise.all(prices).then(p => {
      const totalCost = p.reduce((val, item) => {
        return item + val
      }, 0);

      const creaetedProduct = new this.transactionModel({ productList, total: totalCost });
      return creaetedProduct.save();
    })



  }

  getTop(num: string) {
    return this.transactionModel.aggregate([
      {
        $unwind: {
          path: "$productList",

        }
      },
      {
        $group: {
          _id: "$productList._id", count: {
            $sum: '$productList.count'
          }
        }
      },
      {
        $lookup: {
          localField: "_id",
          from: "products", //the collection name, (bad)before i had Phrase as the model
          foreignField: "_id",
          as: "product"
        }
      },
      { $sort : { count : -1 } }
    ]).limit(parseInt(num))
  }
  getTopUnique(num: string) {
    return this.transactionModel.aggregate([
      {
        $unwind: {
          path: "$productList",

        }
      },
      {
        $group: {
          _id: "$productList._id", count: {
            $sum: 1
          }
        }
      },
      {
        $lookup: {
          localField: "_id",
          from: "products", //the collection name, (bad)before i had Phrase as the model
          foreignField: "_id",
          as: "product"
        }
      },
      { $sort : { count : -1 } }
    ]).limit(parseInt(num))
  }
  getLastDays(num: string) {
    return this.transactionModel.aggregate([{
      $project: {
        yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: '$total'
      }
    }, {
      $group: {
        _id: {
          date: '$yearMonthDay',
        },
        total: {
          $sum: '$total'
        }
      }
    }]).limit(parseInt(num))
  }

}
