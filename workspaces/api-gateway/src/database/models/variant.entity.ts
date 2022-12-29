import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Product } from 'database/models/product.entity';
import { VariantDetail } from 'database/models/variantDetail.entity';

@Entity({ name: 'variants' })
export class Variant extends BaseModel {
  @AutoMap()
  @Column()
  productId: string;

  @AutoMap()
  @Column()
  price: number;

  @AutoMap()
  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product?: Product;

  @OneToMany(() => VariantDetail, (variantDetail) => variantDetail.variant)
  variantDetails?: VariantDetail[];
}
