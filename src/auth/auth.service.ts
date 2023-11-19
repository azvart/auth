import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel('user', 'auth') private userModel: Model<User>,
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
      const saveUser = await newUser.save();
      return await this.generateToken({
        email: saveUser.email,
        admin: saveUser.isAdmin,
        isNewUser: saveUser.isNewUser,
        name: saveUser.name,
        id: saveUser.id,
      });
    }
    if (await compare(password, existUser.password)) {
      const payload = {
        email: existUser.email,
        isAdmin: existUser.isAdmin,
        name: existUser.name,
        id: existUser.id,
        isNewUser: existUser.isNewUser,
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
