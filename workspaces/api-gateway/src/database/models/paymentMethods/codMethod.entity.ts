import { ChildEntity } from 'typeorm';

import { PaymentMethod } from 'database/models/paymentMethod.entity';
import type { ICheckoutResults } from 'api/v1/payments/payments.controller';
import type { ICheckoutParams } from 'api/v1/payments/payments.interface';

@ChildEntity()
export class CodMethod extends PaymentMethod {
  public checkout(_params: ICheckoutParams): Promise<ICheckoutResults> {
    return Promise.resolve({});
  }
}
