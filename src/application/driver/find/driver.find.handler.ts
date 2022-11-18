import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Driver } from '../../../domain/driver.domain';
import { DriverResponse } from '../../../application/dto/driver.response';
import { DriverFindQuery } from './driver.find.query';
import { DriverFind } from './driver.find.uc';

@QueryHandler(DriverFindQuery)
export class DriverFindHandler implements IQueryHandler<DriverFindQuery> {
  constructor(private readonly driverFind: DriverFind) {}

  async execute(
    query: DriverFindQuery,
  ): Promise<DriverResponse[]> {
    const driverList: Driver[] = await this.driverFind.findAll();

    const responseList: DriverResponse[] = [];

    driverList.forEach((driver) => {
      responseList.push(new DriverResponse(driver));
    });

    return responseList;
  }
}
