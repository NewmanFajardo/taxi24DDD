import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TravelRepository } from '../../../domain/ports/travel.repository';
import { Travel } from '../../../domain/travel.domain';
import { TravelCompletedCommand } from './travel.completed.command';

@Injectable()
export class TravelCompleted {
  constructor(
    @Inject(forwardRef(() => 'TravelRepository'))
    private readonly travelRepository: TravelRepository,
  ) {}

  async completedTravel(
    data: TravelCompletedCommand,
  ): Promise<Travel> {
    const travelCompleted = await this.travelRepository.completed(data.id);
    return travelCompleted;
  }
}
