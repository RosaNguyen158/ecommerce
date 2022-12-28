import { Body, Controller, Put } from '@nestjs/common';

import { PaymentStripeDto } from 'api/v1/payments/checkout.dto';
import { ConfirmStripeCheckoutService } from 'api/v1/payments/services/ConfirmPaymentService';
import {
  CreateStripeCheckoutService,
  IPaymentStripe,
} from 'api/v1/payments/services/CreatePaymentService';
import { PaymentOrder } from 'database/models/paymentOrder.entity';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createStripeCheckoutService: CreateStripeCheckoutService,
    private readonly confirmStripeCheckoutService: ConfirmStripeCheckoutService,
  ) {}

  @Put('confirm')
  public async confirmPayment(
    @Body() { orderId }: PaymentStripeDto,
  ): Promise<PaymentOrder> {
    return this.confirmStripeCheckoutService.exec({
      orderId,
    } as IPaymentStripe);
  }
}
