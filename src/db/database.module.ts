import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      connectionName: 'auth',
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI_AUTH'),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      connectionName: 'client',
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI_CLIENT'),
      }),
    }),
  ],
})
export class DatabaseModule {}
