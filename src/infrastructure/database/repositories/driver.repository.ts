import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Driver } from '../../../domain/driver.domain';
import { DriverEntity } from '../mapper/driver.entity';
import { DriverRepository } from '../../../domain/ports/driver.repository';
import { DriverSaveCommand } from '../../../application/driver/save/driver.save.command';

@Injectable()
export class DriverPostgres implements DriverRepository {
  constructor(
    @Inject('DriverModelRepository')
    private driverEntity: typeof DriverEntity,
  ) {}

  toJSON(driver: Driver): any {
    return {
      id: driver.id.value,
      firstName: driver.firstName.value,
      lastName: driver.lastName.value,
      dni: driver.dni.value,
      address: driver.address.value,
      phoneNumber: driver.phoneNumber.value,
    };
  }

  async findAll(limit: number, offset: number): Promise<Driver[]> {
    const driverEntityList = await this.driverEntity.findAll({
      limit,
      offset,
      include: [],
    });

    return driverEntityList.map((driver) => {
      return Driver.fromPrimitives(
        driver.id,
        driver.firstName,
        driver.lastName,
        driver.dni,
        driver.address,
        driver.phoneNumber
      );
    });
  }

  async findOne(id: number): Promise<Driver> {
    const driverEntityList = await this.driverEntity.findAll({
      where: {
        id
      },
      include: [],
    });

    if(!driverEntityList.length){
      throw new HttpException("Driver not found", HttpStatus.NOT_FOUND);
    }

    return Driver.fromPrimitives(
      driverEntityList[0].id,
      driverEntityList[0].firstName,
      driverEntityList[0].lastName,
      driverEntityList[0].dni,
      driverEntityList[0].address,
      driverEntityList[0].phoneNumber
    );
  }

  async save(driver: DriverSaveCommand ): Promise<Driver> {
    const maxID = await this.driverEntity.max("id");
    const newID = maxID ? (parseInt(maxID.toString()) + 1) : 1;

    const driverEntity = await this.driverEntity.create( {
      id: newID,
      firstName: driver.firstName,
      lastName: driver.lastName,
      dni: driver.dni,
      address: driver.address,
      phoneNumber: driver.phoneNumber,
    } );

    return Driver.fromPrimitives(
      driverEntity.id,
      driverEntity.firstName,
      driverEntity.lastName,
      driverEntity.dni,
      driverEntity.address,
      driverEntity.phoneNumber
    );
  }
}
