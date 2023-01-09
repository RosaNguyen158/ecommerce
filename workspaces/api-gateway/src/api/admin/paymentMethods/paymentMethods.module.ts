import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentMethodsController } from 'api/admin/paymentMethods/paymentMethods.controller';
import { CreatePaymentMethodService } from 'api/admin/paymentMethods/services/CreatePaymentMethodService';
import { PaymentMethod } from 'database/models/paymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  providers: [CreatePaymentMethodService],
  controllers: [PaymentMethodsController],
})
export class PaymentMethodsModule {}
