import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import type { Repository } from 'typeorm';

import { CreatePaymentDto } from 'api/v1/payments/payments.dto';
import { Payment } from 'database/models/payment.entity';
import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { CreatePaymentService } from 'api/v1/payments/services/CreatePaymentService';
import { CartDetail } from 'database/models/cartDetail.entity';
import type { IRequest } from 'interface';

export interface ICheckoutResults {
  payment?: Payment;
  url?: string;
}

@Controller('payments')
export class PaymentController {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(CartDetail)
    private cartDetailRepositpry: Repository<CartDetail>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private createPaymentService: CreatePaymentService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/checkout')
  public async createCheckout(
    @Body()
    { method, listCartDetailIds }: CreatePaymentDto,
    @Request() req: IRequest,
  ): Promise<ICheckoutResults> {
    const paymentMethod = await this.paymentMethodRepository.findOneBy({
      name: method,
    });

    const listCartDetails = await this.cartDetailRepositpry.find({
      where: {
        id: In(listCartDetailIds),
      },
      relations: {
        product: true,
      },
    });

    const amount = listCartDetails.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );

    const createPayment = await this.createPaymentService.exec({
      userId: req.user.id,
      listCartDetails,
      amount,
      methodId: paymentMethod.id,
    });

    await this.cartDetailRepositpry.delete({ id: In(listCartDetailIds) });

    return paymentMethod.checkout({
      methodId: paymentMethod.id,
      listCartDetails,
      userId: req.user.id,
      paymentId: createPayment.id,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user-payments')
  public async getUserPayments(@Request() req: IRequest): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: [
        {
          userId: req.user.id,
        },
      ],
      relations: {
        paymentDetails: true,
      },
    });
  }
}
