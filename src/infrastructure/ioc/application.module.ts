import { forwardRef, Module } from '@nestjs/common';
import { PassengerFind } from '../../application/passenger/find/passenger.find.uc';
import { PassengerFindHandler } from '../../application/passenger/find/passenger.find.handler';
import { InfrastructureModule } from './infrastructure.module';
import { PassengerPostgres } from '../database/repositories/passenger.repository';
import { PassengerFindOne } from '../../application/passenger/findOne/passenger.findOne.uc';
import { PassengerFindOneHandler } from '../../application/passenger/findOne/passenger.findOne.handler';
import { PassengerSave } from '../../application/passenger/save/passenger.save.uc';
import { PassengerSaveHandler } from '../../application/passenger/save/passenger.save.handler';

import { DriverPostgres } from '../database/repositories/driver.repository';
import { DriverFind } from '../../application/driver/find/driver.find.uc';
import { DriverFindHandler } from '../../application/driver/find/driver.find.handler';
import { DriverFindOne } from '../../application/driver/findOne/driver.findOne.uc';
import { DriverFindOneHandler } from '../../application/driver/findOne/driver.findOne.handler';
import { DriverSave } from '../../application/driver/save/driver.save.uc';
import { DriverSaveHandler } from '../../application/driver/save/driver.save.handler';

import { TravelPostgres } from '../database/repositories/travel.repository';
import { TravelSave } from '../../application/travel/save/travel.save.uc';
import { TravelSaveHandler } from '../../application/travel/save/travel.save.handler';
import { TravelFindActives } from '../../application/travel/findActives/travel.findActives.uc';
import { TravelFindActivesHandler } from '../../application/travel/findActives/travel.findActives.handler';
import { TravelFindOne } from '../../application/travel/findOne/travel.findOne.uc';
import { TravelFindOneHandler } from '../../application/travel/findOne/travel.findOne.handler';
import { TravelFindCompleted } from '../../application/travel/findCompleted/travel.findCompleted.uc';
import { TravelFindCompletedHandler } from '../../application/travel/findCompleted/travel.findCompleted.handler';
import { TravelCompleted } from '../../application/travel/completed/travel.completed.uc';
import { TravelCompletedHandler } from '../../application/travel/completed/travel.save.handler';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    {
      provide: 'PassengerRepository',
      useClass: PassengerPostgres,
    },
    PassengerFind,
    PassengerFindHandler,

    PassengerFindOne,
    PassengerFindOneHandler,

    PassengerSave,
    PassengerSaveHandler,

    {
      provide: 'DriverRepository',
      useClass: DriverPostgres,
    },

    DriverFind,
    DriverFindHandler,

    DriverFindOne,
    DriverFindOneHandler,

    DriverSave,
    DriverSaveHandler,

    {
      provide: 'TravelRepository',
      useClass: TravelPostgres,
    },

    TravelSave,
    TravelSaveHandler,

    TravelFindActives,
    TravelFindActivesHandler,

    TravelFindOne,
    TravelFindOneHandler,

    TravelFindCompleted,
    TravelFindCompletedHandler,

    TravelCompleted,
    TravelCompletedHandler
  ],
  exports: [
    PassengerFind, 
    PassengerFindHandler,

    PassengerFindOne,
    PassengerFindOneHandler,

    PassengerSave,
    PassengerSaveHandler,

    DriverFind,
    DriverFindHandler,

    DriverFindOne,
    DriverFindOneHandler,

    DriverSave,
    DriverSaveHandler,

    TravelSave,
    TravelSaveHandler,
    
    TravelFindActives,
    TravelFindActivesHandler,

    TravelFindOne,
    TravelFindOneHandler,

    TravelFindCompleted,
    TravelFindCompletedHandler,

    TravelCompleted,
    TravelCompletedHandler
  ],
})
export class ApplicationModule {}
