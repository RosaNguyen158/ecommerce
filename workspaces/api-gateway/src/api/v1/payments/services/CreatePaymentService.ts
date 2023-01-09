import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Payment } from 'database/models/payment.entity';
import { PaymentDetail } from 'database/models/paymentDetail.entity';
import type { ICreatePaymentParams } from 'api/v1/payments/payments.interface';

@Injectable()
export class CreatePaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentDetail)
    private paymentDetailRepository: Repository<PaymentDetail>,
  ) {}

  public async exec({
    userId,
    methodId,
    listCartDetails,
    amount,
    metadata,
  }: ICreatePaymentParams): Promise<Payment> {
    const newPayment = this.paymentRepository.create({
      userId,
      metadata,
      methodId,
      amount,
    });

    try {
      await this.paymentRepository.save(newPayment);

      await this.paymentDetailRepository
        .createQueryBuilder()
        .insert()
        .into(PaymentDetail)
        .values(
          listCartDetails.map(({ productId, quantity, product }) => {
            return {
              paymentId: newPayment.id,
              productId,
              quantity,
              unitPrice: product.price,
            };
          }),
        )
        .execute();

      return newPayment;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
