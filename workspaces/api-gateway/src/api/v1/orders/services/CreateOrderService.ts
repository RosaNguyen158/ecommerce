import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Order } from 'database/models/order.entity';
import { CreateOrderDetailService } from 'api/v1/orders/services/CreateOrderDetailService';
import type { TStatus } from 'database/models/paymentOrder.entity';
import type { IProductOrderParams } from 'api/services/StripeService/interface';

export interface ICreateOrderParams {
  userId: string;
  listProducts: IProductOrderParams[];
  amount: number;
  status?: TStatus;
}

@Injectable()
export class CreateOrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private createOrderDetailService: CreateOrderDetailService,
  ) {}

  public async exec({
    userId,
    listProducts,
  }: ICreateOrderParams): Promise<Order> {
    const newOrder = this.orderRepository.create({ userId });

    try {
      await this.orderRepository.save(newOrder);

      listProducts.map(async (addProduct) => {
        const { productId, quantity, unitPrice } = addProduct;
        await this.createOrderDetailService.exec({
          orderId: newOrder.id,
          productId,
          quantity,
          unitPrice,
        });
      });

      return newOrder;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
