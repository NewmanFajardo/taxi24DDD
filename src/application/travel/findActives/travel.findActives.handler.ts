import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TravelResponse } from '../../../application/dto/travel.response';
import { Travel } from '../../../domain/travel.domain';
import { TravelFindActiveQuery } from './travel.findActives.query';
import { TravelFindActives } from './travel.findActives.uc';

@QueryHandler(TravelFindActiveQuery)
export class TravelFindActivesHandler implements IQueryHandler<TravelFindActiveQuery> {
  constructor(private readonly travelFindActives: TravelFindActives) {}

  async execute(
    query: TravelFindActiveQuery,
  ): Promise<TravelResponse[]> {
    const travelList: Travel[] = await this.travelFindActives.findActives();

    const responseList: TravelResponse[] = [];

    travelList.forEach((travel) => {
      responseList.push(new TravelResponse(travel));
    });

    return responseList;
  }
}
