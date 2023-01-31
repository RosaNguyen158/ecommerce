import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Stripe from 'stripe';

import { Payment } from 'database/models/payment.entity';
import { WebhooksController } from 'api/v1/webhooks/webhooks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [WebhooksController],
  providers: [Stripe],
})
export class WebhooksModule {}
