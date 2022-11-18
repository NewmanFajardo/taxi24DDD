import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Driver } from '../../../domain/driver.domain';
import { DriverRepository } from '../../../domain/ports/driver.repository';

@Injectable()
export class DriverFind {
  constructor(
    @Inject(forwardRef(() => 'DriverRepository'))
    private readonly driverRepository: DriverRepository,
  ) {}

  findAll(): Promise<Driver[]> {
    return this.driverRepository.findAll(100, 0);
  }
}
