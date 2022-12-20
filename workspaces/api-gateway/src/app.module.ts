import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RouterModule } from '@nestjs/core';
import type { Routes } from '@nestjs/core';

import { createTypeOrmOptions } from 'typeOrm.config';
import { AppController } from 'app.controller';
import { AuthModule, authRoutes } from 'api/auth/auth.module';
import { AdminModule, adminRoutes } from 'api/admin/admin.module';

const routes: Routes = [authRoutes, adminRoutes];

@Module({
  imports: [
    RouterModule.register(routes),
    TypeOrmModule.forRoot(createTypeOrmOptions()),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
