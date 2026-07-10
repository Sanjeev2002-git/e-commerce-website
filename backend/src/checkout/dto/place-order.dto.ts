import { IsEnum, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { PaymentMethod } from '../../db/typeorm/enums';

export class PlaceOrderDto {
  @IsUUID()
  addressId!: string;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  couponCode?: string;
}

export class PaymentCallbackDto {
  @IsUUID()
  orderId!: string;

  @IsString()
  gatewayTransactionId!: string;

  @IsString()
  success!: string;
}
