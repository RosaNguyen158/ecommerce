import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RouteTree } from '@nestjs/core';

import { LocalStrategy } from 'api/auth/local.strategy';
import { AuthProfile } from 'api/auth/auth.profile';
import { JwtStrategy } from 'api/auth/jwt.strategy';
import { AuthController } from 'api/auth/auth.controller';
import { User } from 'database/models/user.entity';
import { SignUpService } from 'api/auth/services/SignUpService';
import { SignInService } from 'api/auth/services/SignInService';
import { GetProfileService } from 'api/auth/services/GetProfileService';
import { CreateCartService } from 'api/v1/carts/services/CreateCartService';
import { Cart } from 'database/models/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRES_TIME_JWT),
      },
    }),
  ],
  providers: [
    AuthProfile,
    LocalStrategy,
    JwtStrategy,
    SignUpService,
    SignInService,
    GetProfileService,
    CreateCartService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

export const authRoutes: RouteTree = {
  path: 'api',
  module: AuthModule,
};
