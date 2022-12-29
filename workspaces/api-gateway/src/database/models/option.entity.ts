import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { VariantDetail } from 'database/models/variantDetail.entity';

@Entity({ name: 'options' })
export class Option extends BaseModel {
  @AutoMap()
  @Column()
  name: string;

  @OneToMany(() => VariantDetail, (variantDetails) => variantDetails.option)
  variantDetails?: VariantDetail[];
}
