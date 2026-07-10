import { Body, Controller, Post, Req } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { PlaceOrderDto, PaymentCallbackDto } from './dto/place-order.dto';
import { CartService } from '../cart/cart.service';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly cartService: CartService,
  ) {}

  @Post('place-order')
  async placeOrder(@Req() req: any, @Body() dto: PlaceOrderDto) {
    const cart = await this.cartService.getCartForCheckout(req.user?.userId);
    return this.checkoutService.placeOrder(req.user?.userId, dto, cart);
  }

  @Post('payment-callback')
  async paymentCallback(@Body() dto: PaymentCallbackDto) {
    return this.checkoutService.paymentCallback(dto);
  }
}

