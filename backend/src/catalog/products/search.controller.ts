import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductSearchController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async search(@Query() query: any) {
    return this.productsService.listProducts(query);
  }

  @Get('filters')
  async filters(@Query() query: any) {
    return this.productsService.listProducts(query);
  }

  @Get('similar/:productId')
  async similar(@Query() query: any) {
    return { query, results: [] };
  }

  @Get('frequently-bought-together')
  async frequentlyBoughtTogether(@Query() query: any) {
    return { query, results: [] };
  }
}

