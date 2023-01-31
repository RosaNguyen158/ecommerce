import { Column, Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Payment } from 'database/models/payment.entity';
import { Product } from 'database/models/product.entity';

@Entity({ name: 'payment_details' })
export class PaymentDetail extends BaseModel {
  @AutoMap()
  @Column()
  paymentId: string;

  @AutoMap()
  @Column()
  productId: string;

  @AutoMap()
  @Column()
  quantity: number;

  @AutoMap()
  @Column()
  unitPrice: number;

  @AutoMap(() => Payment)
  @ManyToOne(() => Payment, (payment) => payment.paymentDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payment: Payment;

  @AutoMap(() => Product)
  @ManyToOne(() => Product, (product) => product.paymentDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
