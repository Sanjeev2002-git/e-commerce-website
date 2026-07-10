import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailOtpService } from './services/email-otp.service';
import { RedisTokenService } from './services/redis-token.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { User } from '../db/typeorm/entities/User.entity';
import { LoginSession } from '../db/typeorm/entities/LoginSession.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, LoginSession])],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailOtpService,
    RedisTokenService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
