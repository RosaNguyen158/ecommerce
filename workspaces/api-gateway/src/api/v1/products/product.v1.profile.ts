import { createMap } from '@automapper/core';
import type { MappingProfile } from '@automapper/core';

import { Product } from 'database/models/product.entity';
import {
  ProductsPagyMetadataV1VM,
  ProductsPagyV1VM,
  ProductV1VM,
} from 'api/v1/products/product.v1.vm';

export const productV1Profile: MappingProfile = (mapper) => {
  createMap(mapper, Product, ProductV1VM);
  createMap(mapper, ProductsPagyMetadataV1VM, ProductsPagyV1VM);
};
