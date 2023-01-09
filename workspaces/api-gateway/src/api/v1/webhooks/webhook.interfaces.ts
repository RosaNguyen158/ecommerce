export interface ICard {
  brand: string;
  country: string;
  expMonth: number;
  expYear: number;
  last4: string;
}
export interface IStripeDataObject {
  billingDetails: {
    email: string;
  };
  paymentMethodDetails: {
    card: ICard;
  };
  metadata: {
    paymentId: string;
  };
  paymentStatus: string;
}
