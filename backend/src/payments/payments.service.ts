import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../db/typeorm/entities/Payment.entity';
import { PaymentMethod, PaymentStatus } from '../db/typeorm/enums';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  async createPayment(orderId: string, amount: string, method: PaymentMethod) {
    const payment = this.paymentsRepository.create({
      orderId,
      amount,
      method,
      status: method === PaymentMethod.Cod ? PaymentStatus.Succeeded : PaymentStatus.Initiated,
      gatewayTransactionId: null,
    });

    return this.paymentsRepository.save(payment);
  }

  async transitionPayment(orderId: string, status: PaymentStatus, gatewayTransactionId?: string) {
    const payment = await this.paymentsRepository.findOne({ where: { orderId } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = status;
    if (gatewayTransactionId) {
      payment.gatewayTransactionId = gatewayTransactionId;
    }
    if (status === PaymentStatus.Succeeded) {
      payment.succeededAt = new Date();
      payment.failedAt = null;
    }
    if (status === PaymentStatus.Failed) {
      payment.failedAt = new Date();
    }

    return this.paymentsRepository.save(payment);
  }

  async getPaymentStatus(orderId: string) {
    const payment = await this.paymentsRepository.findOne({ where: { orderId } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }
}
