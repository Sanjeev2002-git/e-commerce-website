import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async list(@Req() req: any) {
    return this.wishlistService.list(req.user?.userId);
  }

  @Post('items')
  async add(@Req() req: any, @Body() body: any) {
    return this.wishlistService.add(req.user?.userId, body.productId);
  }

  @Delete('items/:productId')
  async remove(@Req() req: any, @Param('productId') productId: string) {
    return this.wishlistService.remove(req.user?.userId, productId);
  }

  @Post('items/:productId/move-to-cart')
  async moveToCart(@Req() req: any, @Param('productId') productId: string) {
    return this.wishlistService.moveToCart(req.user?.userId, productId);
  }
}

