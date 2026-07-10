import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../../auth/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  list() {
    return { data: this.categoriesService.listCategories() };
  }

  @Public()
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
