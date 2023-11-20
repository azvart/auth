import { Controller, UseGuards, Get, Post, Req, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RequestWithUser } from '../types/types';

@UseGuards(RolesGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transaction: TransactionService) {}

  @Get('/all')
  @Roles('admin')
  public async getAllTransactions() {
    return await this.transaction.getAllTransactions();
  }

  @Post('/')
  public async createNewTransaction(
    @Req() req: RequestWithUser,
    @Body() data: any,
  ) {
    const payaload = {
      to: data.to,
      value: +data.value,
    };
    return await this.transaction.createNewTransaction(req.user, payaload);
  }

  @Get('/')
  public async getMyTransaction(@Req() req: RequestWithUser) {
    return await this.transaction.getMyTransaction(req.user.id);
  }
}
