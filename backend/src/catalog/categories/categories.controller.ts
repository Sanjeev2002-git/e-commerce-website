import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list() {
    return { data: this.categoriesService.listCategories() };
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return { data: this.categoriesService.getCategory(slug), slug };
  }

  @Post()
  create(@Body() body: any) {
    return { created: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return { id, updated: body };
  }
}

