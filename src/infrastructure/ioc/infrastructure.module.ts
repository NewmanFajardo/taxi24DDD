import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationModule } from './application.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassengerController } from '../http/rest/passenger.controller';
import { PassengerEntity } from '../database/mapper/passenger.entity';
import { passengerProviders } from '../database/providers/passenger.providers';
import { PassengerPostgres } from '../database/repositories/passenger.repository';
import { DriverController } from '../http/rest/driver.controller';
import { driverRepository } from '../database/providers/driver.providers';
import { DriverEntity } from '../database/mapper/driver.entity';
import { DriverPostgres } from '../database/repositories/driver.repository';
import { TravelEntity } from '../database/mapper/travel.entity';
import { travelRepository } from '../database/providers/travel.providers';
import { TravelPostgres } from '../database/repositories/travel.repository';
import { TravelController } from '../http/rest/travel.controller';

@Module({
  imports: [
    CqrsModule, 
    forwardRef(() => ApplicationModule),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB_CONNECTION'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [PassengerEntity, DriverEntity, TravelEntity],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    PassengerController,
    DriverController,
    TravelController
  ],
  providers: [
    ...passengerProviders, 
    PassengerPostgres,
    ...driverRepository,
    DriverPostgres,
    ...travelRepository,
    TravelPostgres
  ],
  exports: [
    ...passengerProviders, 
    PassengerPostgres,
    ...driverRepository,
    DriverPostgres,
    ...travelRepository,
    TravelPostgres
  ],
})
export class InfrastructureModule {}
