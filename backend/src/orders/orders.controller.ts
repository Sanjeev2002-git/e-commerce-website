import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { ReturnOrderDto } from './dto/return-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async list(@Req() req: any, @Query('page') page = '1', @Query('limit') limit = '10') {
    return this.ordersService.listOrders(req.user?.userId, Number(page), Number(limit));
  }

  @Get(':id')
  async get(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.getOrder(req.user?.userId, id);
  }

  @Post(':id/cancel')
  async cancel(@Req() req: any, @Param('id') id: string, @Body() dto: CancelOrderDto) {
    return this.ordersService.cancelOrder(req.user?.userId, id, dto);
  }

  @Post(':id/return')
  async returnOrder(@Req() req: any, @Param('id') id: string, @Body() dto: ReturnOrderDto) {
    return this.ordersService.requestReturn(req.user?.userId, id, dto);
  }

  @Get(':id/track')
  async track(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.getTrackingTimeline(req.user?.userId, id);
  }
}

