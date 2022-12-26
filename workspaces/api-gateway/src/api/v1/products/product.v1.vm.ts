import { AutoMap } from '@automapper/classes';

import { Product } from 'database/models/product.entity';

export class ProductV1VM {
  @AutoMap()
  name: string;

  @AutoMap()
  categoryId: string;

  @AutoMap()
  slug: string;
}

export class ProductsPagyMetadataV1VM {
  @AutoMap(() => [Product])
  data: Product[];

  @AutoMap()
  total: number;
}

export class ProductsPagyV1VM {
  @AutoMap(() => [ProductV1VM])
  data: ProductV1VM[];

  @AutoMap()
  total: number;
}
