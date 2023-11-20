import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Wallet } from '../schemas/wallet.schema';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('wallet', 'client') private walletModel: Model<Wallet>,
    @InjectModel('user', 'auth') private userModel: Model<User>,
    @InjectModel('transaction', 'client')
    private transactionModel: Model<Transaction>,
  ) {}

  public async getAllTransaction() {
    return this.transactionModel.find();
  }

  public async createNewTransaction(user: any, body: any) {
    const { id } = user;
    const { value, to } = body;
    try {
      const myWallet = await this.walletModel.findOne({ user: id });
      if (myWallet.coins < value) {
        return 'Not enough coins in your wallet';
      }
      const anotherWallet = await this.walletModel.findOne({ user: to });

      await this.walletModel.findOneAndUpdate(
        { user: to },
        { coins: anotherWallet.coins + value },
      );
      await this.walletModel.findOneAndUpdate(
        { user: id },
        { coins: myWallet.coins - value },
      );
      return await this.createTransaction(id, to, value);
    } catch (error) {
      throw new HttpException('Error', 404, { cause: error });
    }
  }

  public async getMyTransaction(userId: string) {
    return this.transactionModel.find({ user: userId }).populate([
      { path: 'user', model: this.userModel, options: { strict: false } },
      { path: 'to', model: this.userModel, options: { strict: false } },
      { path: 'from', model: this.userModel, options: { strict: false } },
    ]);
  }

  private async createTransaction(userId: string, to: string, value: number) {
    const newTransaction = await this.transactionModel.create({
      to,
      from: userId,
      user: userId,
      value: value,
    });
    return await newTransaction.save();
  }
  public async getAllTransactions() {
    return this.transactionModel.find().populate([
      { path: 'user', model: this.userModel, options: { strict: false } },
      { path: 'to', model: this.userModel, options: { strict: false } },
      { path: 'from', model: this.userModel, options: { strict: false } },
    ]);
  }
}
