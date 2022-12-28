import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Order } from 'database/models/order.entity';
import { CreateOrderDetailService } from 'api/v1/orders/services/CreateOrderDetailService';
import { CreateStripeCheckoutService } from 'api/v1/payments/services/CreatePaymentService';
import type { CreateOrderDto } from 'api/v1/orders/orders.dto';

@Injectable()
export class CreateOrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private createOrderDetailService: CreateOrderDetailService,
    private createStripeCheckoutService: CreateStripeCheckoutService,
  ) {}

  public async exec({
    userId,
    paymentMethodId,
    listProducts,
  }: CreateOrderDto): Promise<{
    order: Order;
    amount: number;
    status: string;
  }> {
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

      const total = listProducts.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0,
      );

      const createPayment = await this.createStripeCheckoutService.exec({
        orderId: newOrder.id,
        methodId: paymentMethodId,
        total,
      });

      return {
        order: newOrder,
        amount: createPayment.amount,
        status: createPayment.status,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
