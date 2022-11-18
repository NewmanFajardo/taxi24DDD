import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DriverSaveCommand } from './driver.save.command';
import { DriverRepository } from '../../../domain/ports/driver.repository';
import { Driver } from '../../../domain/driver.domain';

@Injectable()
export class DriverSave {
  constructor(
    @Inject(forwardRef(() => 'DriverRepository'))
    private readonly driverRepository: DriverRepository,
  ) {}

  async createDriver(
    data: DriverSaveCommand,
  ): Promise<Driver> {
    const driverCreated = await this.driverRepository.save(data);
    return driverCreated;
  }
}
