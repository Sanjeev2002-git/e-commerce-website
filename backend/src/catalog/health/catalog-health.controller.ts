import { Controller, Get } from '@nestjs/common';

@Controller('catalog')
export class CatalogHealthController {
  @Get('health')
  health() {
    return { status: 'ok', module: 'catalog' };
  }
}

