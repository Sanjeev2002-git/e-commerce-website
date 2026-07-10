import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';
import { CatalogHealthController } from './health/catalog-health.controller';
import { BulkUploadController } from './products/bulk-upload.controller';
import { ProductSearchController } from './products/search.controller';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';

@Module({
  controllers: [
    CatalogHealthController,
    CategoriesController,
    ProductsController,
    BulkUploadController,
    ProductSearchController,
  ],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService],
})
export class CatalogModule {}

