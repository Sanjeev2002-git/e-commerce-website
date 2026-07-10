import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../db/typeorm/entities/Order.entity';
import { OrderStatus } from '../db/typeorm/enums';

@Injectable()
export class LogisticsService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async getStatus(orderId: string) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      orderId,
      status: order.status,
      courier: 'BlueDart',
      trackingNumber: `BD-${order.id.slice(0, 8).toUpperCase()}`,
      updatedAt: new Date(),
    };
  }

  async advanceStatus(orderId: string, status: string) {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const nextStatus = status as OrderStatus;
    if (nextStatus === OrderStatus.Confirmed) {
      order.confirmedAt = new Date();
    }
    if (nextStatus === OrderStatus.Packed) {
      order.packedAt = new Date();
    }
    if (nextStatus === OrderStatus.Shipped) {
      order.shippedAt = new Date();
    }
    if (nextStatus === OrderStatus.OutForDelivery) {
      order.outForDeliveryAt = new Date();
    }
    if (nextStatus === OrderStatus.Delivered) {
      order.deliveredAt = new Date();
    }

    order.status = nextStatus;
    await this.ordersRepository.save(order);
    return { message: 'Status updated', orderId, status: order.status };
  }
}
