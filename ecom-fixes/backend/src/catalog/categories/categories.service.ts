import { Injectable } from '@nestjs/common';

export type Category = {
  slug: string;
  name: string;
  icon: string;
  image_url: string;
  featured?: boolean;
};

@Injectable()
export class CategoriesService {
  private readonly categories: Category[] = [
    {
      slug: 'fashion',
      name: 'Fashion',
      icon: '👗',
      image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'electronics',
      name: 'Electronics',
      icon: '📱',
      image_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'mobiles',
      name: 'Mobiles',
      icon: '📲',
      image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'home',
      name: 'Home & Furniture',
      icon: '🛋️',
      image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'kitchen',
      name: 'Kitchen & Appliances',
      icon: '🍳',
      image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'beauty',
      name: 'Beauty & Personal Care',
      icon: '💄',
      image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'sports',
      name: 'Sports & Fitness',
      icon: '🏋️',
      image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'books',
      name: 'Books',
      icon: '📚',
      image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'grocery',
      name: 'Grocery & Gourmet',
      icon: '🛒',
      image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'toys',
      name: 'Toys & Baby',
      icon: '🧸',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'automotive',
      name: 'Automotive',
      icon: '🚗',
      image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'jewelry-watches',
      name: 'Jewelry & Watches',
      icon: '💍',
      image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop',
      featured: true,
    },
    {
      slug: 'health',
      name: 'Health & Wellness',
      icon: '💊',
      image_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'stationery',
      name: 'Stationery & Office',
      icon: '✏️',
      image_url: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'pet-supplies',
      name: 'Pet Supplies',
      icon: '🐾',
      image_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&auto=format&fit=crop',
      featured: false,
    },
    {
      slug: 'music',
      name: 'Musical Instruments',
      icon: '🎸',
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop',
      featured: false,
    },
  ];

  listCategories() {
    return this.categories;
  }

  getCategory(slug: string) {
    return this.categories.find((category) => category.slug === slug) ?? null;
  }
}
