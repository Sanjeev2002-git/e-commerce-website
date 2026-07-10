import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../db/typeorm/entities/Order.entity';
import { OrderStatus } from '../db/typeorm/enums';
import { CreateReturnDto } from './dto/create-return.dto';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async requestReturn(userId: string, orderId: string, dto: CreateReturnDto) {
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
      throw new BadRequestException('Return window has expired');
    }

    order.status = OrderStatus.ReturnRequested;
    order.returnRequestedAt = new Date();
    await this.ordersRepository.save(order);

    return {
      message: 'Return requested',
      orderId,
      status: order.status,
      reason: dto.reason,
    };
  }
}
