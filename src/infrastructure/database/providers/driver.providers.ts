import { DriverEntity } from "../mapper/driver.entity";

export const driverRepository = [
  {
    provide: 'DriverModelRepository',
    useValue: DriverEntity,
  },
];
