import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DriverResponse } from '../../../application/dto/driver.response';
import { DriverSaveCommand } from './driver.save.command';
import { DriverSave } from './driver.save.uc';

@CommandHandler(DriverSaveCommand)
export class DriverSaveHandler implements ICommandHandler {
  constructor(private readonly driverSave: DriverSave) {}

  async execute(
    driver: DriverSaveCommand,
  ): Promise<DriverResponse> {
    const driverCreated = await this.driverSave.createDriver(driver);

    return new DriverResponse(driverCreated);
  }
}
