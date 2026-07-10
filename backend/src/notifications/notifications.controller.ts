import { Controller, Get, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async list(@Req() req: any) {
    return this.notificationsService.list(req.user?.userId);
  }
}

