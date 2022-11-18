import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Passenger } from '../../../domain/passenger.domain';
import { PassengerResponse } from '../../dto/passenger.response';
import { PassengerFindOneQuery } from './passenger.findOne.query';
import { PassengerFindOne } from './passenger.findOne.uc';

@QueryHandler(PassengerFindOneQuery)
export class PassengerFindOneHandler implements IQueryHandler<PassengerFindOneQuery> {
  constructor(private readonly passengerFindOne: PassengerFindOne) {}

  async execute(
    query: PassengerFindOneQuery,
  ): Promise<PassengerResponse> {
    const passengerList: Passenger = await this.passengerFindOne.findOne(query.id);

    return new PassengerResponse(passengerList);
  }
}
