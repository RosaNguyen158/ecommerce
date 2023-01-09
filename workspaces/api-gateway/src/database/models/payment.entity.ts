import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { User } from 'database/models/user.entity';
import { PaymentDetail } from 'database/models/paymentDetail.entity';
import type { IMetadataParams } from 'api/v1/payments/payments.interface';

export const status = {
  unpaid: 'unpaid',
  paid: 'paid',
  pending: 'pending',
  failed: 'failed',
} as const;

export type TStatus = keyof typeof status;

@Entity({ name: 'payments' })
export class Payment extends BaseModel {
  @AutoMap()
  @Column()
  userId: string;

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

  @AutoMap()
  @Column('simple-json')
  metadata: IMetadataParams;

  @AutoMap(() => User)
  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.payment)
  paymentDetails: PaymentDetail[];
}
