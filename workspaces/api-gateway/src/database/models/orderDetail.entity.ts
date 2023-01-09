import { Column, Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Order } from 'database/models/order.entity';
import { Product } from 'database/models/product.entity';

@Entity({ name: 'order_details' })
export class OrderDetail extends BaseModel {
  @AutoMap()
  @Column()
  orderId: string;

  @AutoMap()
  @Column()
  productId: string;

  @AutoMap()
  @Column()
  quantity: number;

  @AutoMap()
  @Column()
  unitPrice: number;

  @AutoMap(() => Order)
  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;

  @AutoMap(() => Product)
  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
