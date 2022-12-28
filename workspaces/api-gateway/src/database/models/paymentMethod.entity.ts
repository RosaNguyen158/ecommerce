import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { PaymentOrder } from 'database/models/paymentOrder.entity';

@Entity({ name: 'payment_methods' })
export class PaymentMethod extends BaseModel {
  @AutoMap()
  @Column()
  name: string;

  @OneToMany(() => PaymentOrder, (paymentOrder) => paymentOrder.method)
  paymentOrders?: PaymentOrder[];
}
