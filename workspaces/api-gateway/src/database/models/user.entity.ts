import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Order } from 'database/models/order.entity';

export const roles = {
  user: 'user',
  admin: 'admin',
} as const;

export type TRole = keyof typeof roles;

@Entity({ name: 'users' })
export class User extends BaseModel {
  @AutoMap()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @AutoMap()
  @Column({ nullable: true, unique: true })
  email: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: roles,
    default: roles.user,
  })
  role: TRole;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}
