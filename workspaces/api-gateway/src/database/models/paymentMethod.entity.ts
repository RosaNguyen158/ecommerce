import { Column, Entity, TableInheritance } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import type { ICheckoutParams } from 'api/v1/payments/payments.interface';
import type { ICheckoutResults } from 'api/v1/payments/payments.controller';

@Entity({ name: 'payment_methods' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentMethod extends BaseModel {
  @AutoMap()
  @Column()
  name: string;

  public abstract checkout(params: ICheckoutParams): Promise<ICheckoutResults>;
}
