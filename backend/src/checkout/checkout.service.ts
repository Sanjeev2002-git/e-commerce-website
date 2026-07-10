import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../db/typeorm/entities/Order.entity';
import { OrderItem } from '../db/typeorm/entities/OrderItem.entity';
import { Payment } from '../db/typeorm/entities/Payment.entity';
import { UserAddress } from '../db/typeorm/entities/UserAddress.entity';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../db/typeorm/enums';
import { PlaceOrderDto, PaymentCallbackDto } from './dto/place-order.dto';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(UserAddress)
    private readonly addressesRepository: Repository<UserAddress>,
    private readonly paymentsService: PaymentsService,
  ) {}

  async placeOrder(userId: string, dto: PlaceOrderDto, cart: any) {
    if (!cart?.items?.length) {
      throw new BadRequestException('Cart is empty');
    }

    const address = await this.addressesRepository.findOne({ where: { id: dto.addressId, userId } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }

    const subtotal = cart.items.reduce((sum: number, item: any) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
    const shipping = subtotal > 1000 ? 0 : 79;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = queryRunner.manager.create(Order, {
        userId,
        sellerId: cart.items[0]?.sellerId || '00000000-0000-0000-0000-000000000000',
        status: OrderStatus.Pending,
        shippingLine1: address.line1,
        shippingLine2: address.line2 ?? null,
        shippingCity: address.city,
        shippingState: address.state ?? null,
        shippingPostalCode: address.postalCode,
        shippingCountry: address.country,
        shippingFullName: address.fullName,
        shippingPhone: address.phone ?? null,
        couponCode: dto.couponCode ?? null,
        couponDiscountAmount: '0',
        subtotalAmount: subtotal.toFixed(2),
        shippingAmount: shipping.toFixed(2),
        taxAmount: tax.toFixed(2),
        totalAmount: total.toFixed(2),
      });
      const savedOrder = await queryRunner.manager.save(order);

      for (const item of cart.items) {
        const orderItem = queryRunner.manager.create(OrderItem, {
          orderId: savedOrder.id,
          productId: item.productId,
          title: item.title || 'Product',
          qty: item.qty || 1,
          unitPrice: String(item.price || 0),
          unitDiscountAmount: '0',
          lineAmount: String((Number(item.price || 0) * Number(item.qty || 1)).toFixed(2)),
        });
        await queryRunner.manager.save(orderItem);
      }

      const payment = queryRunner.manager.create(Payment, {
        orderId: savedOrder.id,
        method: dto.paymentMethod,
        amount: total.toFixed(2),
        status: dto.paymentMethod === PaymentMethod.Cod ? PaymentStatus.Succeeded : PaymentStatus.Initiated,
      });
      const savedPayment = await queryRunner.manager.save(payment);

      savedOrder.paymentId = savedPayment.id;
      await queryRunner.manager.save(savedOrder);

      await queryRunner.commitTransaction();

      return {
        order: {
          ...savedOrder,
          payment: savedPayment,
        },
        paymentToken: dto.paymentMethod === PaymentMethod.Cod ? 'cod' : 'mock-payment-token',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async paymentCallback(dto: PaymentCallbackDto) {
    const order = await this.ordersRepository.findOne({ where: { id: dto.orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = await this.paymentsRepository.findOne({ where: { orderId: dto.orderId } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (dto.success === 'true') {
      order.status = OrderStatus.Confirmed;
      order.confirmedAt = new Date();
      await this.ordersRepository.save(order);
      await this.paymentsService.transitionPayment(dto.orderId, PaymentStatus.Succeeded, dto.gatewayTransactionId);
      return { message: 'Payment succeeded', orderId: dto.orderId, paymentStatus: PaymentStatus.Succeeded };
    }

    order.status = OrderStatus.Pending;
    await this.ordersRepository.save(order);
    await this.paymentsService.transitionPayment(dto.orderId, PaymentStatus.Failed, dto.gatewayTransactionId);
    return { message: 'Payment failed', orderId: dto.orderId, paymentStatus: PaymentStatus.Failed };
  }
}
