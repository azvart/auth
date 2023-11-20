import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RequestWithUser } from '../types/types';

@UseGuards(RolesGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly wallet: WalletService) {}

  @Get('/')
  public async getWallet(@Req() req: RequestWithUser) {
    return await this.wallet.getWallet(req.user.id);
  }

  @Post('/:id')
  @Roles('admin')
  public async addedCoinsToWallet(
    @Param('id') id: string,
    @Body('coins') coins: number,
  ) {
    return await this.wallet.addedCoinsToWallet(id, coins);
  }

  @Delete('/:id')
  @Roles('admin')
  public async deleteWallet(@Param('id') id: string) {
    return await this.wallet.deleteWallet(id);
  }
}
