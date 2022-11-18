import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DriverResponse } from '../../../application/dto/driver.response';
import { Driver } from '../../../domain/driver.domain';
import { DriverFindOneQuery } from './driver.findOne.query';
import { DriverFindOne } from './driver.findOne.uc';

@QueryHandler(DriverFindOneQuery)
export class DriverFindOneHandler implements IQueryHandler<DriverFindOneQuery> {
  constructor(private readonly driverFindOne: DriverFindOne) {}

  async execute(
    query: DriverFindOneQuery,
  ): Promise<DriverResponse> {
    const driverList: Driver = await this.driverFindOne.findOne(query.id);

    return new DriverResponse(driverList);
  }
}
