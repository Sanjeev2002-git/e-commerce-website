import { Injectable } from '@nestjs/common';

export type CatalogProduct = {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  specs: Record<string, string>;
  brand: string;
  ratings: number;
  description: string;
  discount?: number;
  color?: string;
  ram?: string;
  storage?: string;
  screenSize?: string;
  processor?: string;
  os?: string;
};

@Injectable()
export class ProductsService {
  private readonly products: CatalogProduct[] = [
    {
      id: 'prod-1',
      title: 'AeroLite Backpack',
      price: 1899,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'],
      category: 'fashion',
      stock: 24,
      specs: { material: 'Nylon', color: 'Black' },
      brand: 'UrbanTrail',
      ratings: 4.6,
      description: 'Travel-ready backpack with laptop sleeve.',
      discount: 15,
      color: 'Black',
    },
    {
      id: 'prod-2',
      title: 'Nova Smartwatch',
      price: 6499,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'],
      category: 'electronics',
      stock: 18,
      specs: { battery: '7 days', color: 'Silver' },
      brand: 'Nova',
      ratings: 4.8,
      description: 'Health tracking smartwatch with AMOLED display.',
      discount: 10,
      color: 'Silver',
      os: 'WearOS',
    },
    {
      id: 'prod-3',
      title: 'Breeze 4K LED TV',
      price: 28999,
      images: ['https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80'],
      category: 'electronics',
      stock: 9,
      specs: { screenSize: '55 inch', resolution: '4K' },
      brand: 'Breeze',
      ratings: 4.5,
      description: 'Immersive cinematic experience with HDR support.',
      discount: 12,
      screenSize: '55 inch',
      os: 'Android TV',
    },
    {
      id: 'prod-4',
      title: 'Luna Dining Table',
      price: 15999,
      images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'],
      category: 'home',
      stock: 7,
      specs: { material: 'Engineered Wood', seats: '4' },
      brand: 'Luna',
      ratings: 4.4,
      description: 'Minimalist dining table for compact homes.',
      discount: 8,
      color: 'Walnut',
    },
    {
      id: 'prod-5',
      title: 'Glow Blender',
      price: 3499,
      images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'],
      category: 'kitchen',
      stock: 15,
      specs: { power: '750W', color: 'Cream' },
      brand: 'Glow',
      ratings: 4.3,
      description: 'Powerful blender for smoothies and sauces.',
      discount: 5,
      color: 'Cream',
    },
  ];

  async listProducts(query: Record<string, string> = {}) {
    const filtered = this.products.filter((product) => {
      if (query.category && product.category !== query.category) return false;
      if (query.brand && product.brand.toLowerCase() !== query.brand.toLowerCase()) return false;
      if (query.search) {
        const term = query.search.toLowerCase();
        const haystack = `${product.title} ${product.description} ${product.brand} ${product.category}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });

    return { data: filtered, total: filtered.length };
  }

  async getProduct(productId: string) {
    return this.products.find((product) => product.id === productId) ?? null;
  }

  async createProduct(product: Partial<CatalogProduct>) {
    const nextProduct = { ...product, id: `prod-${Date.now()}` } as CatalogProduct;
    this.products.push(nextProduct);
    return nextProduct;
  }

  async updateProduct(productId: string, product: Partial<CatalogProduct>) {
    const index = this.products.findIndex((item) => item.id === productId);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  async listCategories() {
    return [
      { slug: 'fashion', name: 'Fashion' },
      { slug: 'electronics', name: 'Electronics' },
      { slug: 'home', name: 'Home' },
      { slug: 'kitchen', name: 'Kitchen' },
    ];
  }
}

