import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { User } from 'database/models/user.entity';
import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { OrderDetail } from 'database/models/orderDetail.entity';

@Entity({ name: 'orders' })
export class Order extends BaseModel {
  @AutoMap()
  @Column()
  userId: string;

  @AutoMap(() => User)
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => PaymentOrder, (paymentOrder) => paymentOrder.order)
  paymentOrders: PaymentOrder[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
