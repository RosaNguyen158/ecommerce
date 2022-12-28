import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RouteTree } from '@nestjs/core';

import { ProductsModule } from 'api/v1/products/products.module';
import { CategoriesModule } from 'api/v1/categories/categories.module';
import { V1Profile } from 'api/v1/v1.profile';
import { Order } from 'database/models/order.entity';
import { OrderDetail } from 'database/models/orderDetail.entity';
import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { OrdersModule } from 'api/v1/orders/orders.module';
import { PaymentsModule } from 'api/v1/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, PaymentMethod, PaymentOrder]),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    PaymentsModule,
  ],
  providers: [V1Profile],
})
export class V1Module {}

export const v1Routes: RouteTree = {
  path: 'api/v1',
  module: V1Module,
  children: [ProductsModule, CategoriesModule, OrdersModule, PaymentsModule],
};
