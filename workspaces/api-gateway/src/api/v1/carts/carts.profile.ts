import { createMap } from '@automapper/core';
import type { MappingProfile } from '@automapper/core';

import { CartDetailVM, CartVM } from 'api/v1/carts/carts.vm';
import { Cart } from 'database/models/cart.entity';
import { CartDetail } from 'database/models/cartDetail.entity';

export const cartsProfile: MappingProfile = (mapper) => {
  createMap(mapper, Cart, CartVM);
  createMap(mapper, CartDetail, CartDetailVM);
};
