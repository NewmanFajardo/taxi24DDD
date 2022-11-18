import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { TravelResponse } from '../../../application/dto/travel.response';
import { TravelSaveCommand } from './travel.save.command';
import { TravelSave } from './travel.save.uc';

@CommandHandler(TravelSaveCommand)
export class TravelSaveHandler implements ICommandHandler {
  constructor(private readonly travelSave: TravelSave) {}

  async execute(
    travel: TravelSaveCommand,
  ): Promise<TravelResponse> {
    const travelCreated = await this.travelSave.createTravel(travel);

    return new TravelResponse(travelCreated);
  }
}
