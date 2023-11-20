import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { WalletSchema } from '../schemas/wallet.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JwtModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }], 'auth'),
    MongooseModule.forFeature(
      [{ name: 'wallet', schema: WalletSchema }],
      'client',
    ),
  ],
  controllers: [WalletController],
  providers: [WalletService, JwtService],
})
export class WalletModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(WalletController);
  }
}
