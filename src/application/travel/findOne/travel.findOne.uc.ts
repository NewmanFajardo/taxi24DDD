import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TravelRepository } from '../../../domain/ports/travel.repository';
import { Travel } from '../../../domain/travel.domain';

@Injectable()
export class TravelFindOne {
  constructor(
    @Inject(forwardRef(() => 'TravelRepository'))
    private readonly travelRepository: TravelRepository,
  ) {}

  findOne(id: number): Promise<Travel> {
    return this.travelRepository.findOne(id);
  }
}
