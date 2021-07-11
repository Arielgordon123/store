import { Injectable } from '@nestjs/common';
import { InjectModel,  Schema as MongooseSchema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(@InjectModel(Transaction.name) private transactionModel: mongoose.Model<TransactionDocument>) {}

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
