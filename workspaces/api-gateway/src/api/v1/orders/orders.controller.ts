import { Body, Controller, Get } from '@nestjs/common';

import { GetOrderService } from 'api/v1/orders/services/GetOrderService';
import { Order } from 'database/models/order.entity';
import { GetOrderDto } from 'api/v1/orders/orders.dto';
import type { IGetOrderParams } from 'api/v1/orders/services/GetOrderService';

@Controller('orders')
export class OrdersController {
  constructor(private readonly getOrderService: GetOrderService) {}

  @Get('list')
  public async getUserOrder(@Body() { userId }: GetOrderDto): Promise<Order[]> {
    return this.getOrderService.exec({ userId } as IGetOrderParams);
  }
}
