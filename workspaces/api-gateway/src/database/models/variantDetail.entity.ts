import { Column, Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseModel } from 'database/models/BaseModel';
import { Variant } from 'database/models/variant.entity';
import { Option } from 'database/models/option.entity';

@Entity({ name: 'variant_details' })
export class VariantDetail extends BaseModel {
  @AutoMap()
  @Column()
  variantId: string;

  @AutoMap()
  @Column()
  optionId: string;

  @AutoMap()
  @Column()
  valueOption: string;

  @ManyToOne(() => Variant, (variant) => variant.variantDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  variant?: Variant;

  @ManyToOne(() => Option, (option) => option.variantDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  option?: Option;
}
