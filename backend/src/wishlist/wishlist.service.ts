import { Injectable, BadRequestException } from '@nestjs/common';
import { CartService } from '../cart/cart.service';

@Injectable()
export class WishlistService {
  private readonly wishlist = new Map<string, string[]>();

  constructor(private readonly cartService: CartService) {}

  private getItems(userId: string) {
    if (!this.wishlist.has(userId)) this.wishlist.set(userId, []);
    return this.wishlist.get(userId)!;
  }

  async add(userId: string, productId: string) {
    const items = this.getItems(userId);
    if (!items.includes(productId)) items.push(productId);
    return { message: 'Added to wishlist', items };
  }

  async remove(userId: string, productId: string) {
    const items = this.getItems(userId).filter((id) => id !== productId);
    this.wishlist.set(userId, items);
    return { message: 'Removed from wishlist', items };
  }

  async list(userId: string) {
    return { items: this.getItems(userId) };
  }

  async moveToCart(userId: string, productId: string) {
    await this.remove(userId, productId);
    return this.cartService.addItem(userId, { productId, qty: 1 });
  }
}
