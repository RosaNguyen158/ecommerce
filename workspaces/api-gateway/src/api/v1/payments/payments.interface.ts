import type { ICard } from 'api/v1/webhooks/webhook.interfaces';
import type { CartDetail } from 'database/models/cartDetail.entity';

export interface ICreatePaymentParams {
  userId: string;
  listCartDetails: CartDetail[];
  amount: number;
  methodId: string;
  metadata?: IMetadataParams;
}
export interface IMetadataParams extends ICard {
  email: string;
}

export interface IPaymentDetailParams {
  productId: string;
  quantity: number;
  unitPrice: number;
  paymentId: string;
}

export interface ICheckoutParams {
  paymentId: string;
  methodId: string;
  userId: string;
  listCartDetails: CartDetail[];
}
