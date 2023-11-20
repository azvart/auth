import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { WalletSchema } from '../schemas/wallet.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }], 'auth'),
    MongooseModule.forFeature(
      [{ name: 'wallet', schema: WalletSchema }],
      'client',
    ),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
