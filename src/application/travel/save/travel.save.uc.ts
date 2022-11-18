import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TravelRepository } from '../../../domain/ports/travel.repository';
import { TravelSaveCommand } from './travel.save.command';
import { Travel } from '../../../domain/travel.domain';

@Injectable()
export class TravelSave {
  constructor(
    @Inject(forwardRef(() => 'TravelRepository'))
    private readonly travelRepository: TravelRepository,
  ) {}

  async createTravel(
    data: TravelSaveCommand,
  ): Promise<Travel> {
    const travelCreated = await this.travelRepository.save(data);
    return travelCreated;
  }
}
