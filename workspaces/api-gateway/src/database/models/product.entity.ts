import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Category } from 'database/models/category.entity';
import { ProductsCategories } from 'database/models/productsCategories.entity';
import { PaymentDetail } from 'database/models/paymentDetail.entity';
import { CartDetail } from 'database/models/cartDetail.entity';

@Entity({ name: 'products' })
export class Product extends BaseModel {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  categoryId: string;

  @AutoMap()
  @Column()
  slug: string;

  @AutoMap()
  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category?: Category;

  @AutoMap(() => [ProductsCategories])
  @OneToMany(
    () => ProductsCategories,
    (productsCategories) => productsCategories.product,
  )
  productsCategories?: ProductsCategories[];

  @OneToMany(
    () => PaymentDetail,
    (paymentdetailDetail) => paymentdetailDetail.product,
  )
  paymentDetails?: PaymentDetail[];

  @OneToMany(() => CartDetail, (cartDetailDetail) => cartDetailDetail.product)
  cartDetails?: CartDetail[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
