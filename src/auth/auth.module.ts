import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('SECRET'),
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }], 'auth'),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
