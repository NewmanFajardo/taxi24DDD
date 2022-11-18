import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PassengerSaveCommand } from './passenger.save.command';
import { PassengerRepository } from '../../../domain/ports/passenger.repository';
import { Passenger } from '../../../domain/passenger.domain';

@Injectable()
export class PassengerSave {
  constructor(
    @Inject(forwardRef(() => 'PassengerRepository'))
    private readonly passengerRepository: PassengerRepository,
  ) {}

  async createPassanger(
    data: PassengerSaveCommand,
  ): Promise<Passenger> {
    const passengerCreated = await this.passengerRepository.save(data);
    return passengerCreated;
  }
}
