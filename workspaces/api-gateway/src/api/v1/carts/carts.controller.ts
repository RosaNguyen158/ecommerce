import { MapInterceptor } from '@automapper/nestjs';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductCartDto } from 'api/v1/carts/carts.dto';
import { CartDetailVM, CartVM } from 'api/v1/carts/carts.vm';
import { AddItemToCartService } from 'api/v1/carts/services/CreateCartDetailService';
import { GetUserCartService } from 'api/v1/carts/services/GetUserCartService';
import { Cart } from 'database/models/cart.entity';
import { CartDetail } from 'database/models/cartDetail.entity';
import type { IRequest } from 'interface';

@Controller('carts')
export class CartsController {
  constructor(
    private GetUserCartService: GetUserCartService,
    private addItemToCartService: AddItemToCartService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @UseInterceptors(MapInterceptor(Cart, CartVM))
  public async getUserCart(@Request() req: IRequest): Promise<Cart> {
    return this.GetUserCartService.exec(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(MapInterceptor(CartDetail, CartDetailVM))
  public async addItemToCart(
    @Body() addItemToCart: ProductCartDto,
    @Request() req: IRequest,
  ): Promise<CartDetail> {
    return this.addItemToCartService.exec(addItemToCart, req.user.id);
  }
}
