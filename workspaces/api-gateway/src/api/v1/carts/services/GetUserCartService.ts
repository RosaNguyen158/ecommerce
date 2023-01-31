import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Cart } from 'database/models/cart.entity';

@Injectable()
export class GetUserCartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepoditory: Repository<Cart>,
  ) {}

  public async exec(userId: string): Promise<Cart> {
    try {
      const getCart = await this.cartRepoditory.findOne({
        where: {
          userId,
        },
        relations: {
          cartDetails: true,
        },
      });
      return getCart;
    } catch (error) {
      throw new InternalServerErrorException('empty cart!');
    }
  }
}
