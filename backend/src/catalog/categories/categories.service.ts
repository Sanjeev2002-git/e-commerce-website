import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private readonly categories = [
    { slug: 'fashion', name: 'Fashion' },
    { slug: 'electronics', name: 'Electronics' },
    { slug: 'home', name: 'Home' },
    { slug: 'kitchen', name: 'Kitchen' },
  ];

  listCategories() {
    return this.categories;
  }

  getCategory(slug: string) {
    return this.categories.find((category) => category.slug === slug) ?? null;
  }
}

