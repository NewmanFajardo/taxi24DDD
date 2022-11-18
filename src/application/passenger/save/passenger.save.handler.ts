import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { PassengerResponse } from '../../../application/dto/passenger.response';
import { PassengerSaveCommand } from './passenger.save.command';
import { PassengerSave } from './passenger.save.uc';

@CommandHandler(PassengerSaveCommand)
export class PassengerSaveHandler implements ICommandHandler {
  constructor(private readonly passengerSave: PassengerSave) {}

  async execute(
    passenger: PassengerSaveCommand,
  ): Promise<PassengerResponse> {
    const passengerCreated = await this.passengerSave.createPassanger(passenger);

    return new PassengerResponse(passengerCreated);
  }
}
