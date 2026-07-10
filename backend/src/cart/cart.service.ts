import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductsService } from '../catalog/products/products.service';

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  qty: number;
  sellerId?: string;
};

@Injectable()
export class CartService {
  private readonly carts = new Map<string, CartItem[]>();

  constructor(private readonly productsService: ProductsService) {}

  private getCart(userId: string) {
    if (!this.carts.has(userId)) {
      this.carts.set(userId, []);
    }
    return this.carts.get(userId)!;
  }

  async addItem(userId: string, payload: { productId: string; qty?: number; price?: number }) {
    const product = await this.productsService.getProduct(payload.productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    if (payload.qty && payload.qty < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }
    if (payload.price !== undefined && Number(payload.price) !== Number(product.price)) {
      throw new BadRequestException('Price mismatch');
    }

    const cart = this.getCart(userId);
    const existing = cart.find((item) => item.productId === payload.productId);
    const qty = payload.qty ?? 1;
    if (existing) {
      existing.qty += qty;
      existing.price = product.price;
    } else {
      cart.push({ productId: payload.productId, title: product.title, price: product.price, qty, sellerId: product.category });
    }

    return { message: 'Item added', items: cart };
  }

  async list(userId: string) {
    return { items: this.getCart(userId) };
  }

  async removeItem(userId: string, productId: string) {
    const cart = this.getCart(userId);
    const filtered = cart.filter((item) => item.productId !== productId);
    this.carts.set(userId, filtered);
    return { message: 'Item removed', items: filtered };
  }

  async updateItem(userId: string, productId: string, qty: number) {
    const cart = this.getCart(userId);
    const item = cart.find((entry) => entry.productId === productId);
    if (!item) {
      throw new BadRequestException('Item not found');
    }
    item.qty = qty;
    return { message: 'Item updated', items: cart };
  }

  async getCartForCheckout(userId: string) {
    const items = this.getCart(userId);
    return { userId, items, subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0) };
  }

  async applyCoupon(userId: string, code: string) {
    return { message: 'Coupon applied', code, userId };
  }

  async removeCoupon(userId: string) {
    return { message: 'Coupon removed', userId };
  }
}
