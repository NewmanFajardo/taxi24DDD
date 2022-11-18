import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { TravelResponse } from '../../dto/travel.response';
import { TravelCompletedCommand } from './travel.completed.command';
import { TravelCompleted } from './travel.completed.uc';

@CommandHandler(TravelCompletedCommand)
export class TravelCompletedHandler implements ICommandHandler {
  constructor(private readonly travelCompleted: TravelCompleted) {}

  async execute(
    travel: TravelCompletedCommand,
  ): Promise<TravelResponse> {
    const travelCreated = await this.travelCompleted.completedTravel(travel);

    return new TravelResponse(travelCreated);
  }
}
