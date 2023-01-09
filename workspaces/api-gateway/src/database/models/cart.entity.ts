import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseModel } from 'database/models/BaseModel';
import { User } from 'database/models/user.entity';
import { CartDetail } from 'database/models/cartDetail.entity';

@Entity({ name: 'carts' })
export class Cart extends BaseModel {
  @AutoMap()
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @AutoMap(() => [CartDetail])
  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.cart)
  cartDetails?: CartDetail[];
}
