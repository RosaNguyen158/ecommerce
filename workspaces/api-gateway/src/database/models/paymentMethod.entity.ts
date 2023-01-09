import { Column, Entity, TableInheritance } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { CreateOrderService } from 'api/v1/orders/services/CreateOrderService';
import { CreatePaymentOrderService } from 'api/v1/paymentOrders/services/CreatePaymentOrderService';
import type {
  IMetadataParams,
  IPaymentMethodParams,
  IPaymentParams,
} from 'api/services/StripeService/interface';
import type { ICreateOrderParams } from 'api/v1/orders/services/CreateOrderService';

@Entity({ name: 'payment_methods' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentMethod extends BaseModel {
  constructor(
    protected createOrderService: CreateOrderService,
    protected createPaymentOrderService: CreatePaymentOrderService,
  ) {
    super();
  }

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column('simple-json')
  metadata: IMetadataParams;

  protected abstract createPaymentMethod(
    params: IPaymentMethodParams,
  ): Promise<PaymentMethod>;

  public async checkout(params: IPaymentParams): Promise<PaymentOrder> {
    const { userId, amount, status, listProducts } = params;
    const createPaymentMethod = await this.createPaymentMethod(params);

    const createOrder = await this.createOrderService.exec({
      userId,
      listProducts,
    } as ICreateOrderParams);

    const paymentOrder = await this.createPaymentOrderService.exec({
      orderId: createOrder.id,
      methodId: createPaymentMethod.id,
      amount,
      status,
    } as IPaymentParams);
    return paymentOrder;
  }
}
