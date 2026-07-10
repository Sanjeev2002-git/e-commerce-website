import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../db/typeorm/entities/Order.entity';
import { OrderStatus } from '../db/typeorm/enums';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { ReturnOrderDto } from './dto/return-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async listOrders(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [orders, total] = await this.ordersRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return { data: orders, page, limit, total, hasMore: skip + orders.length < total };
  }

  async getOrder(userId: string, orderId: string) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId, userId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async cancelOrder(userId: string, orderId: string, dto: CancelOrderDto) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId, userId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!([OrderStatus.Pending, OrderStatus.Confirmed, OrderStatus.Packed] as string[]).includes(order.status)) {
      throw new BadRequestException('Order cannot be cancelled in its current state');
    }

    order.status = OrderStatus.Cancelled;
    order.cancelledAt = new Date();
    await this.ordersRepository.save(order);

    return { message: 'Order cancelled', orderId, reason: dto.reason };
  }

  async requestReturn(userId: string, orderId: string, dto: ReturnOrderDto) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId, userId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.Delivered) {
      throw new BadRequestException('Only delivered orders can be returned');
    }

    const deliveredAt = order.deliveredAt ? new Date(order.deliveredAt) : new Date();
    const windowEndsAt = new Date(deliveredAt.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (new Date() > windowEndsAt) {
      throw new BadRequestException('Return window expired');
    }

    order.status = OrderStatus.ReturnRequested;
    order.returnRequestedAt = new Date();
    await this.ordersRepository.save(order);

    return { message: 'Return requested', orderId, reason: dto.reason, status: order.status };
  }

  async getTrackingTimeline(userId: string, orderId: string) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId, userId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const timeline = [] as Array<{ status: string; at: Date | null }>;
    timeline.push({ status: 'pending', at: order.createdAt });
    if (order.confirmedAt) timeline.push({ status: 'confirmed', at: order.confirmedAt });
    if (order.packedAt) timeline.push({ status: 'packed', at: order.packedAt });
    if (order.shippedAt) timeline.push({ status: 'shipped', at: order.shippedAt });
    if (order.outForDeliveryAt) timeline.push({ status: 'out_for_delivery', at: order.outForDeliveryAt });
    if (order.deliveredAt) timeline.push({ status: 'delivered', at: order.deliveredAt });
    if (order.cancelledAt) timeline.push({ status: 'cancelled', at: order.cancelledAt });
    if (order.returnRequestedAt) timeline.push({ status: 'return_requested', at: order.returnRequestedAt });
    return { orderId, timeline };
  }
}
