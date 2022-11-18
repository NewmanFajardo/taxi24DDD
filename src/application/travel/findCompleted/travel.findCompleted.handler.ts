import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TravelResponse } from '../../../application/dto/travel.response';
import { Travel } from '../../../domain/travel.domain';
import { TravelFindCompleteQuery } from './travel.findCompleted.query';
import { TravelFindCompleted } from './travel.findCompleted.uc';

@QueryHandler(TravelFindCompleteQuery)
export class TravelFindCompletedHandler implements IQueryHandler<TravelFindCompleteQuery> {
  constructor(private readonly travelFindCompleted: TravelFindCompleted) {}

  async execute(
    query: TravelFindCompleteQuery,
  ): Promise<TravelResponse[]> {
    const travelList: Travel[] = await this.travelFindCompleted.findCompleted();

    const responseList: TravelResponse[] = [];

    travelList.forEach((travel) => {
      responseList.push(new TravelResponse(travel));
    });

    return responseList;
  }
}
