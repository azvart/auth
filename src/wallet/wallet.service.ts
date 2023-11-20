import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Wallet } from '../schemas/wallet.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('wallet', 'client') private walletModel: Model<Wallet>,
    @InjectModel('user', 'auth') private userModel: Model<User>,
  ) {}
  public async getWallet(userId: string) {
    try {
      return await this.walletModel.findOne({ user: userId });
    } catch (error) {
      throw new HttpException('Error', 404, { cause: error });
    }
  }

  public async addedCoinsToWallet(walletId: string, coins: number) {}
  public async deleteWallet(walletId: string) {
    return this.walletModel.deleteOne({ id: walletId });
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async freeCoinsEveryDay() {
    try {
      console.log('Start cron');
      const allWallets = await this.walletModel.find();
      for (const wallet of allWallets) {
        const updated = await this.walletModel.findOneAndUpdate(
          { _id: wallet._id },
          { coins: wallet.coins + 1000 },
        );
      }
    } catch (error) {
      throw new HttpException('Error in cron job', 404, { cause: error });
    }
  }
}
