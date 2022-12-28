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

  public async exec(params: IGetOrderParams): Promise<Order[]> {
    return await this.orderRepository.findBy(params);
  }
}
