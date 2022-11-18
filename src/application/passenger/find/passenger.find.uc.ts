import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Passenger } from '../../../domain/passenger.domain';
import { PassengerRepository } from '../../../domain/ports/passenger.repository';

@Injectable()
export class PassengerFind {
  constructor(
    @Inject(forwardRef(() => 'PassengerRepository'))
    private readonly passengerRepository: PassengerRepository,
  ) {}

  findAll(): Promise<Passenger[]> {
    return this.passengerRepository.findAll(100, 0);
  }
}
