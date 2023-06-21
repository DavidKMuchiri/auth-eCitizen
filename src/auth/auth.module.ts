import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { config } from 'dotenv';
import { UsersModule } from 'src/users/users.module';
config();

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION},
  }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
