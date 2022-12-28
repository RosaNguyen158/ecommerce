import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from 'api/v1/orders/orders.controller';
import { CreateOrderDetailService } from 'api/v1/orders/services/CreateOrderDetailService';
import { CreateOrderService } from 'api/v1/orders/services/CreateOrderService';
import { GetOrderService } from 'api/v1/orders/services/GetOrderService';
import { CreateStripeCheckoutService } from 'api/v1/payments/services/CreatePaymentService';
import { Order } from 'database/models/order.entity';
import { OrderDetail } from 'database/models/orderDetail.entity';
import { PaymentOrder } from 'database/models/paymentOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, PaymentOrder])],
  providers: [
    CreateOrderService,
    CreateOrderDetailService,
    GetOrderService,
    CreateStripeCheckoutService,
    Stripe,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
