import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateStripeCheckoutService } from 'api/v1/payments/services/CreatePaymentService';
import { PaymentsController } from 'api/v1/payments/payments.controller';
import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { ConfirmStripeCheckoutService } from 'api/v1/payments/services/ConfirmPaymentService';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentOrder])],
  providers: [
    CreateStripeCheckoutService,
    Stripe,
    ConfirmStripeCheckoutService,
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
