import { TravelEntity } from "../mapper/travel.entity";

export const travelRepository = [
  {
    provide: 'TravelModelRepository',
    useValue: TravelEntity,
  },
];
