import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { RoleModule } from './components/role/role.module';
import { AddressModule } from './components/address/address.module';
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';
import { OrderStatusModule } from './components/order-status/order-status.module';
import { WeeklyProductModule } from './components/weekly-product/weekly-product.module';
import { OrderProductModule } from './components/order-product/order-product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(config.database.host),
        port: +configService.get<number>(config.database.port),
        username: configService.get(config.database.username),
        password: configService.get(config.database.password),
        database: configService.get(config.database.name),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    AddressModule,
    ProductModule,
    OrderModule,
    OrderStatusModule,
    WeeklyProductModule,
    OrderProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
