import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { CreatePaymentOrderService } from 'api/v1/paymentOrders/services/CreatePaymentOrderService';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentOrder])],
  providers: [Stripe, CreatePaymentOrderService],
})
export class PaymentsModule {}
