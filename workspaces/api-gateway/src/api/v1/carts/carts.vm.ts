import { AutoMap } from '@automapper/classes';

export class CartVM {
  @AutoMap()
  userId: string;

  @AutoMap(() => [CartDetailVM])
  cartDetails: CartDetailVM[];
}

export class CartDetailVM {
  @AutoMap()
  id: string;

  @AutoMap()
  productId: string;

  @AutoMap()
  quantity: number;
}
