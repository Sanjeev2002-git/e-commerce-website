import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post(':orderId')
  async request(@Req() req: any, @Param('orderId') orderId: string, @Body() dto: CreateReturnDto) {
    return this.returnsService.requestReturn(req.user?.userId, orderId, dto);
  }
}

