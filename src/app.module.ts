import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { config } from 'dotenv';
config()

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
