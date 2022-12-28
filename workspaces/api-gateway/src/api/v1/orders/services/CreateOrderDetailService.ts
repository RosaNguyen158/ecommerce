import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { OrderDetail } from 'database/models/orderDetail.entity';

export interface IOrderDetailParams {
  orderId: string;
  productId: string;
  unitPrice: number;
  quantity: number;
}

@Injectable()
export class CreateOrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  public async exec(params: IOrderDetailParams): Promise<OrderDetail> {
    const newOrderDetail = this.orderDetailRepository.create(params);

    try {
      return this.orderDetailRepository.save(newOrderDetail);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
