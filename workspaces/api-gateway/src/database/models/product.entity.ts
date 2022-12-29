import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { Category } from 'database/models/category.entity';
import { ProductsCategories } from 'database/models/productsCategories.entity';
import { BaseModel } from 'database/models/BaseModel';
import { Variant } from 'database/models/variant.entity';

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

  @OneToMany(() => Variant, (variant) => variant.product)
  variants?: Variant[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
