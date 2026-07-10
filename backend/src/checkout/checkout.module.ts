import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Order } from '../db/typeorm/entities/Order.entity';
import { OrderItem } from '../db/typeorm/entities/OrderItem.entity';
import { Payment } from '../db/typeorm/entities/Payment.entity';
import { UserAddress } from '../db/typeorm/entities/UserAddress.entity';
import { PaymentsModule } from '../payments/payments.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Payment, UserAddress]), PaymentsModule, CartModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}

