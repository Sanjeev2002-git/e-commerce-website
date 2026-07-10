import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnsController } from './returns.controller';
import { ReturnsService } from './returns.service';
import { Order } from '../db/typeorm/entities/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}

