import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AddressesModule } from './addresses/addresses.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';
import { ReturnsModule } from './returns/returns.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LogisticsModule } from './logistics/logistics.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME', 'ecommerce'),
        synchronize: false,
        logging: false,
        entities: [__dirname + '/**/*.entity.{js,ts}'],
      }),
    }),

    CatalogModule,
    CartModule,
    WishlistModule,
    AddressesModule,
    CheckoutModule,
    OrdersModule,
    ReturnsModule,
    NotificationsModule,
    LogisticsModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}


