import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { WalletSchema } from '../schemas/wallet.schema';
import { TransactionSchema } from '../schemas/transaction.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }], 'auth'),
    MongooseModule.forFeature(
      [
        { name: 'wallet', schema: WalletSchema },
        { name: 'transaction', schema: TransactionSchema },
      ],
      'client',
    ),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, JwtService],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(TransactionController);
  }
}
