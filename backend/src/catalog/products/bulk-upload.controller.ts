import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class BulkUploadController {
  @Post('bulk-upload/csv')
  async uploadCsv(@Body() body: any) {
    return { message: 'Bulk upload accepted', received: body };
  }
}

