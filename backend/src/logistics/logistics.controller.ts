import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get(':orderId')
  async status(@Param('orderId') orderId: string) {
    return this.logisticsService.getStatus(orderId);
  }

  @Post(':orderId/update-status')
  async updateStatus(@Param('orderId') orderId: string, @Body() body: any) {
    return this.logisticsService.advanceStatus(orderId, body.status);
  }
}

