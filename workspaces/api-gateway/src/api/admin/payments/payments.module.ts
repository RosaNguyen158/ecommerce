import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentMethodsController } from 'api/admin/payments/paymentMethods.controller';
import { CreatePaymentMethodService } from 'api/admin/payments/services/CreatePaymentMethodService';
import { PaymentMethod } from 'database/models/paymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  providers: [CreatePaymentMethodService],
  controllers: [PaymentMethodsController],
})
export class PaymentMethodsModule {}
