import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TravelRepository } from '../../../domain/ports/travel.repository';
import { Travel } from '../../../domain/travel.domain';

@Injectable()
export class TravelFindActives {
  constructor(
    @Inject(forwardRef(() => 'TravelRepository'))
    private readonly travelRepository: TravelRepository,
  ) {}

  findActives(): Promise<Travel[]> {
    return this.travelRepository.findActives();
  }
}
