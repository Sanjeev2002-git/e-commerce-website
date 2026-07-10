import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { Order } from '../db/typeorm/entities/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [LogisticsController],
  providers: [LogisticsService],
})
export class LogisticsModule {}


