import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { Wallet } from '../schemas/wallet.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel('user', 'auth') private userModel: Model<User>,
    @InjectModel('wallet', 'client') private walletModel: Model<Wallet>,
  ) {}

  public async signIn(data: any) {
    const { email, password } = data;
    const existUser = await this.userModel.findOne({ email: email });
    if (!existUser) {
      const hashPassword = await hash(password, 10);
      const newUser = await this.userModel.create({
        email,
        password: hashPassword,
      });

      const newWallet = await this.walletModel.create({
        user: newUser.id,
        coins: 1000,
      });
      newUser.wallet = newWallet.id;
      await newWallet.save();
      const saveUser = await newUser.save();
      return await this.generateToken({
        email: saveUser.email,
        role: saveUser.role,
        name: saveUser.name,
        id: saveUser.id,
      });
    }
    if (await compare(password, existUser.password)) {
      const payload = {
        email: existUser.email,
        role: existUser.role,
        name: existUser.name,
        id: existUser.id,
      };
      return await this.generateToken(payload);
    } else {
      throw new UnauthorizedException();
    }
  }

  public async generateToken(payload: any) {
    return await this.jwt.signAsync(payload);
  }
}
