import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PassengerFindQuery } from './passenger.find.query';
import { Passenger } from '../../../domain/passenger.domain';
import { PassengerResponse } from '../../dto/passenger.response';
import { PassengerFind } from './passenger.find.uc';

@QueryHandler(PassengerFindQuery)
export class PassengerFindHandler implements IQueryHandler<PassengerFindQuery> {
  constructor(private readonly passengerFind: PassengerFind) {}

  async execute(
    query: PassengerFindQuery,
  ): Promise<PassengerResponse[]> {
    const passengerList: Passenger[] = await this.passengerFind.findAll();

    const responseList: PassengerResponse[] = [];

    passengerList.forEach((passenger) => {
      responseList.push(new PassengerResponse(passenger));
    });

    return responseList;
  }
}
