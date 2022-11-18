import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../domain/ports/driver.repository';
import { Driver } from '../../../domain/driver.domain';

@Injectable()
export class DriverFindOne {
  constructor(
    @Inject(forwardRef(() => 'DriverRepository'))
    private readonly driverRepository: DriverRepository,
  ) {}

  findOne(id: number): Promise<Driver> {
    return this.driverRepository.findOne(id);
  }
}
