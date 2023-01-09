import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from 'database/models/payment.entity';
import { PaymentDetail } from 'database/models/paymentDetail.entity';
import { CreatePaymentService } from 'api/v1/payments/services/CreatePaymentService';
import { PaymentController } from 'api/v1/payments/payments.controller';
import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { CartDetail } from 'database/models/cartDetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaymentDetail,
      PaymentMethod,
      CartDetail,
    ]),
  ],
  providers: [CreatePaymentService, Stripe],
  controllers: [PaymentController],
})
export class PaymentsModule {}
