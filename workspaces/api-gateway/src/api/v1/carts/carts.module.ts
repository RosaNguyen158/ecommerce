import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartsController } from 'api/v1/carts/carts.controller';
import { AddItemToCartService } from 'api/v1/carts/services/CreateCartDetailService';
import { CreateCartService } from 'api/v1/carts/services/CreateCartService';
import { GetUserCartService } from 'api/v1/carts/services/GetUserCartService';
import { Cart } from 'database/models/cart.entity';
import { CartDetail } from 'database/models/cartDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartDetail])],
  providers: [CreateCartService, GetUserCartService, AddItemToCartService],
  controllers: [CartsController],
})
export class CartsModule {}
