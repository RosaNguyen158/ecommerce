import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { CartDetail } from 'database/models/cartDetail.entity';
import { Cart } from 'database/models/cart.entity';
import type { ProductCartDto } from 'api/v1/carts/carts.dto';

@Injectable()
export class AddItemToCartService {
  constructor(
    @InjectRepository(CartDetail)
    private cartDetailRepositpry: Repository<CartDetail>,
    @InjectRepository(Cart)
    private cartRepositpry: Repository<Cart>,
  ) {}

  public async exec(
    { productId, quantity }: ProductCartDto,
    userId: string,
  ): Promise<CartDetail> {
    try {
      let addItem: CartDetail;
      const getCart = await this.cartRepositpry.findOne({
        where: {
          userId,
        },
      });

      const checkItemInCart = await this.cartDetailRepositpry.findOne({
        where: {
          productId,
        },
      });

      if (checkItemInCart) {
        addItem = await this.cartDetailRepositpry.save({
          id: checkItemInCart.id,
          ...checkItemInCart,
          quantity: checkItemInCart.quantity + quantity,
        });
      } else {
        addItem = this.cartDetailRepositpry.create({
          productId,
          quantity,
          cartId: getCart.id,
        });
        await this.cartDetailRepositpry.save(addItem);
      }

      return addItem;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
