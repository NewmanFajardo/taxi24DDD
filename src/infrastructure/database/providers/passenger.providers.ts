import { PassengerEntity } from "../mapper/passenger.entity";

export const passengerProviders = [
  {
    provide: 'PassengerModelRepository',
    useValue: PassengerEntity,
  },
];
