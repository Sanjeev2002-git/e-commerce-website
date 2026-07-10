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

const CATEGORY_CONFIG: Record<string, { brands: string[]; nouns: string[]; priceRange: [number, number] }> = {
  fashion: {
    brands: ['UrbanTrail', 'Wrogn', 'Roadster', 'HRX', 'Levis', 'Aurelia', 'Denizen'],
    nouns: ['Backpack', 'Sneakers', 'Jacket', 'T-Shirt', 'Jeans', 'Sandals', 'Watch', 'Sunglasses'],
    priceRange: [399, 4999],
  },
  electronics: {
    brands: ['Nova', 'Breeze', 'Zeta', 'Pulse', 'Orbit', 'Vortex', 'Quantum'],
    nouns: ['Smartwatch', 'LED TV', 'Bluetooth Speaker', 'Wireless Earbuds', 'Power Bank', 'Smartphone', 'Laptop', 'Router'],
    priceRange: [999, 89999],
  },
  home: {
    brands: ['Luna', 'Nestwell', 'Casa', 'Havenly', 'Urban Ladder', 'Woodsmith'],
    nouns: ['Dining Table', 'Sofa Set', 'Bookshelf', 'Bed Frame', 'Wardrobe', 'Curtains', 'Table Lamp', 'Rug'],
    priceRange: [799, 45999],
  },
  kitchen: {
    brands: ['Glow', 'Prestige', 'Borosil', 'Milton', 'Wonderchef', 'Cello'],
    nouns: ['Blender', 'Induction Cooktop', 'Non-Stick Pan', 'Air Fryer', 'Water Bottle', 'Mixer Grinder', 'Cookware Set'],
    priceRange: [249, 12999],
  },
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateCatalog(count: number): CatalogProduct[] {
  const rand = mulberry32(42);
  const categories = Object.keys(CATEGORY_CONFIG);
  const products: CatalogProduct[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(rand() * categories.length)];
    const config = CATEGORY_CONFIG[category];
    const brand = config.brands[Math.floor(rand() * config.brands.length)];
    const noun = config.nouns[Math.floor(rand() * config.nouns.length)];
    const [minPrice, maxPrice] = config.priceRange;
    const price = Math.round(minPrice + rand() * (maxPrice - minPrice));
    const discount = Math.floor(rand() * 40);
    const ratings = Math.round((3 + rand() * 2) * 10) / 10;
    const variant = ['Pro', 'Max', 'Lite', 'Plus', 'Edge', 'Classic', ''][Math.floor(rand() * 7)];

    products.push({
      id: `prod-${i + 6}`,
      title: `${brand} ${noun}${variant ? ' ' + variant : ''}`,
      price,
      images: [],
      category,
      stock: Math.floor(rand() * 200),
      specs: {},
      brand,
      ratings,
      description: `${noun} from ${brand}, built for everyday reliability.`,
      discount,
    });
  }

  return products;
}

@Injectable()
export class ProductsService {
  private readonly featured: CatalogProduct[] = [
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

  private readonly products: CatalogProduct[] = [...this.featured, ...generateCatalog(10000)];

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

    const page = Math.max(1, parseInt(query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit as string, 10) || 24));
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return { data: paged, total: filtered.length, page, limit };
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
