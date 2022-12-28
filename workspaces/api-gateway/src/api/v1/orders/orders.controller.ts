import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateOrderDto, GetOrderDto } from 'api/v1/orders/orders.dto';
import { CreateOrderService } from 'api/v1/orders/services/CreateOrderService';
import {
  GetOrderService,
  IGetOrderParams,
} from 'api/v1/orders/services/GetOrderService';
import { Order } from 'database/models/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getOrderService: GetOrderService,
  ) {}

  @Post()
  public async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<{
    order: Order;
    amount: number;
    status: string;
  }> {
    return this.createOrderService.exec(createOrderDto);
  }

  @Get('list')
  public async getUserOrder(@Body() { userId }: GetOrderDto): Promise<Order[]> {
    return this.getOrderService.exec({ userId } as IGetOrderParams);
  }
}
