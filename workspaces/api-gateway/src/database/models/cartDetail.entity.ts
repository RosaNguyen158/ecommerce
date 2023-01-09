import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from 'database/models/BaseModel';
import { Cart } from 'database/models/cart.entity';
import { Product } from 'database/models/product.entity';

@Entity({ name: 'cart_details' })
export class CartDetail extends BaseModel {
  @AutoMap()
  @Column()
  cartId: string;

  @AutoMap()
  @Column()
  productId: string;

  @AutoMap()
  @Column()
  quantity: number;

  @AutoMap(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: Cart;

  @AutoMap(() => Product)
  @ManyToOne(() => Product, (product) => product.cartDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
