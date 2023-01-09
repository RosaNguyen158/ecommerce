import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Order } from 'database/models/order.entity';

export interface IGetOrderParams {
  id: string;
  userId: string;
}

@Injectable()
export class GetOrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  public async exec(key: IGetOrderParams): Promise<Order[]> {
    try {
      const getOrderIds = await this.orderRepository.find({
        where: [
          {
            userId: key.userId,
          },
          {
            id: key.id,
          },
        ],
        relations: {
          orderDetails: true,
          paymentOrders: true,
        },
      });
      return getOrderIds;
    } catch (error) {
      error;
    }
  }
}
