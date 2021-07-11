import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { ProductsModule } from 'src/products/products.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]), ProductsModule] ,
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
