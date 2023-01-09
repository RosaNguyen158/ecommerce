import type { ICreateOrderParams } from 'api/v1/orders/services/CreateOrderService';

export interface IMetadataParams {
  last4: string;
  brandCard: string;
  country: string;
  exp_month: number;
  exp_year: number;
}

export interface IProductOrderParams {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface IPaymentMethodParams {
  metadata?: IMetadataParams;
  name: string;
  email?: string;
}

export interface IPaymentParams
  extends ICreateOrderParams,
    IPaymentMethodParams {
  orderId?: string;
  methodId?: string;
  amount: number;
}
