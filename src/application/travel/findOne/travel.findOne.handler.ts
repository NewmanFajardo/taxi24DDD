import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TravelResponse } from '../../../application/dto/travel.response';
import { Travel } from '../../../domain/travel.domain';
import { TravelFindOneQuery } from './travel.findOne.query';
import { TravelFindOne } from './travel.findOne.uc';

@QueryHandler(TravelFindOneQuery)
export class TravelFindOneHandler implements IQueryHandler<TravelFindOneQuery> {
  constructor(private readonly travelFindOne: TravelFindOne) {}

  async execute(
    query: TravelFindOneQuery,
  ): Promise<TravelResponse> {
    const travelList: Travel = await this.travelFindOne.findOne(query.id);

    return new TravelResponse(travelList);
  }
}
