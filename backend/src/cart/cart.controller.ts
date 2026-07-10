import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any, @Query() query: any) {
    return this.cartService.list(req.user?.userId);
  }

  @Post('items')
  async addItem(@Req() req: any, @Body() body: any) {
    return this.cartService.addItem(req.user?.userId, body);
  }

  @Put('items/:itemId')
  async updateItem(@Req() req: any, @Param('itemId') itemId: string, @Body() body: any) {
    return this.cartService.updateItem(req.user?.userId, itemId, body.qty);
  }

  @Delete('items/:itemId')
  async removeItem(@Req() req: any, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(req.user?.userId, itemId);
  }

  @Post('coupon/apply')
  async applyCoupon(@Req() req: any, @Body() body: any) {
    return this.cartService.applyCoupon(req.user?.userId, body.code);
  }
}

