import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { Wallet } from '../schemas/wallet.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user', 'auth') private userModel: Model<User>,
    @InjectModel('wallet', 'client') private walletModel: Model<Wallet>,
  ) {}

  public async getAllUsers() {
    const users = await this.userModel.find().populate({
      path: 'wallet',
      model: this.walletModel,
      options: { strict: false },
    });
    return users;
  }
}
