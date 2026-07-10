import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from '../../auth/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  async list(@Query() query: any) {
    return this.productsService.listProducts(query);
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productsService.getProduct(id);
    return { data: product, id };
  }

  @Post()
  async create(@Body() body: any) {
    return this.productsService.createProduct(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.updateProduct(id, body);
  }
}
