import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook/razorpay')
  async razorpayWebhook(
    @Headers('x-razorpay-signature') razorpaySignature: string,
    @Body() body: any,
  ) {
    return {
      message: 'Webhook received',
      razorpaySignaturePresent: Boolean(razorpaySignature),
      received: body,
      status: 'accepted',
    };
  }

  @Get(':orderId')
  async getStatus(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentStatus(orderId);
  }

  @Post('refunds/:paymentId')
  async refund(@Param('paymentId') paymentId: string, @Body() body: any) {
    return { message: 'Refund initiated', paymentId, received: body };
  }
}

