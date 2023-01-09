import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentMethodsController } from 'api/admin/paymentMethods/paymentMethods.controller';
import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { CodMethod } from 'database/models/paymentMethods/codMethod.entity';
import { StripeMethod } from 'database/models/paymentMethods/stripeMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod, CodMethod, StripeMethod])],
  controllers: [PaymentMethodsController],
})
export class PaymentMethodsModule {}
