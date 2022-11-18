import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Passenger } from '../../../domain/passenger.domain';
import { PassengerRepository } from '../../../domain/ports/passenger.repository';

@Injectable()
export class PassengerFindOne {
  constructor(
    @Inject(forwardRef(() => 'PassengerRepository'))
    private readonly passengerRepository: PassengerRepository,
  ) {}

  findOne(id: number): Promise<Passenger> {
    return this.passengerRepository.findOne(id);
  }
}
