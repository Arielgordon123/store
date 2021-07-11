import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get('lastDays/:num')
  getLastDays(@Param('num') num:string = "5") {
    return this.transactionService.getLastDays(num);
  }

  @Get('topUnique/:num')
  getTopUnique(@Param('num') num:string = "5") {
    return this.transactionService.getTopUnique(num);
  }
  @Get('top/:num')
  getTop(@Param('num') num:string = "5") {
    return this.transactionService.getTop(num);
  }

}
