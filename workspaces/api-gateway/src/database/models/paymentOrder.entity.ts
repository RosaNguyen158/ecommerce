import { Column, Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Order } from 'database/models/order.entity';
import { PaymentMethod } from 'database/models/paymentMethod.entity';

export const status = {
  unpaid: 'unpaid',
  paid: 'paid',
  pending: 'pending',
} as const;

export type TStatus = keyof typeof status;

@Entity({ name: 'payment_orders' })
export class PaymentOrder extends BaseModel {
  @AutoMap()
  @Column()
  orderId: string;

  @AutoMap()
  @Column()
  methodId: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: status,
    default: status.unpaid,
  })
  status: TStatus;

  @AutoMap()
  @Column()
  amount: number;

  @AutoMap(() => Order)
  @ManyToOne(() => Order, (order) => order.paymentOrders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;

  @AutoMap(() => PaymentMethod)
  @ManyToOne(() => PaymentMethod, (method) => method.paymentOrders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  method: PaymentMethod;
}
