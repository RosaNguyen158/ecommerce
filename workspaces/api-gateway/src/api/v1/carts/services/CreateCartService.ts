import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Cart } from 'database/models/cart.entity';
import type { CartDto } from 'api/v1/carts/carts.dto';

@Injectable()
export class CreateCartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  public async exec({ userId }: CartDto): Promise<Cart> {
    const newCart = this.cartRepository.create({ userId });

    try {
      return this.cartRepository.save(newCart);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
