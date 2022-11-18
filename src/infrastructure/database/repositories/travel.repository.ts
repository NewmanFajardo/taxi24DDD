import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Driver } from '../../../domain/driver.domain';
import { DriverEntity } from '../mapper/driver.entity';
import { TravelRepository } from '../../../domain/ports/travel.repository';
import { TravelEntity } from '../mapper/travel.entity';
import { Travel } from '../../../domain/travel.domain';
import { TravelSaveCommand } from '../../../application/travel/save/travel.save.command';
import { PassengerEntity } from '../mapper/passenger.entity';
import { Passenger } from '../../../domain/passenger.domain';

@Injectable()
export class TravelPostgres implements TravelRepository {
  constructor(
    @Inject('TravelModelRepository')
    private travelEntity: typeof TravelEntity,
  ) {}

  toJSON(travel: Travel): any {
    return {
      id: travel.id.value,
      status: travel.status.value,
      passenger: {
        id: travel.passenger.id.value,
        firstName: travel.passenger.firstName.value,
        lastName: travel.passenger.lastName.value,
        dni: travel.passenger.dni.value,
        address: travel.passenger.address.value,
        phoneNumber: travel.passenger.phoneNumber.value,
      },
      travel: {
        id: travel.passenger.id.value,
        firstName: travel.passenger.firstName.value,
        lastName: travel.passenger.lastName.value,
        dni: travel.passenger.dni.value,
        address: travel.passenger.address.value,
        phoneNumber: travel.passenger.phoneNumber.value,
      },
    };
  }

  async findActives(): Promise<Travel[]> {
    const travelEntityList = await this.travelEntity.findAll({
      where:{
        status: 'Active'
      },
      include: [
        DriverEntity,
        PassengerEntity,
      ]
    })

    return travelEntityList.map((travel) => {
      return Travel.fromPrimitives(
        travel.id,
        travel.status,
        Passenger.fromPrimitives(
          travel.passenger.id,
          travel.passenger.firstName,
          travel.passenger.lastName,
          travel.passenger.dni,
          travel.passenger.address,
          travel.passenger.phoneNumber
        ),
        Driver.fromPrimitives(
          travel.driver.id,
          travel.driver.firstName,
          travel.driver.lastName,
          travel.driver.dni,
          travel.driver.address,
          travel.driver.phoneNumber
        ),
      );
    });
  }

  async findCompleted(): Promise<Travel[]> {
    const travelEntityList = await this.travelEntity.findAll({
      where:{
        status: 'Complete'
      },
      include: [
        DriverEntity,
        PassengerEntity,
      ]
    })

    return travelEntityList.map((travel) => {
      return Travel.fromPrimitives(
        travel.id,
        travel.status,
        Passenger.fromPrimitives(
          travel.passenger.id,
          travel.passenger.firstName,
          travel.passenger.lastName,
          travel.passenger.dni,
          travel.passenger.address,
          travel.passenger.phoneNumber
        ),
        Driver.fromPrimitives(
          travel.driver.id,
          travel.driver.firstName,
          travel.driver.lastName,
          travel.driver.dni,
          travel.driver.address,
          travel.driver.phoneNumber
        ),
      );
    });
  }

  async findOne(id: number): Promise<Travel> {
    const travelEntityList = await this.travelEntity.findAll({
      where:{
        id
      },
      include: [
        DriverEntity,
        PassengerEntity,
      ]
    })

    if(!travelEntityList.length){
      throw new HttpException("Travel not found", HttpStatus.NOT_FOUND);
    }

    return Travel.fromPrimitives(
      travelEntityList[0].id,
      travelEntityList[0].status,
      Passenger.fromPrimitives(
        travelEntityList[0].passenger.id,
        travelEntityList[0].passenger.firstName,
        travelEntityList[0].passenger.lastName,
        travelEntityList[0].passenger.dni,
        travelEntityList[0].passenger.address,
        travelEntityList[0].passenger.phoneNumber
      ),
      Driver.fromPrimitives(
        travelEntityList[0].driver.id,
        travelEntityList[0].driver.firstName,
        travelEntityList[0].driver.lastName,
        travelEntityList[0].driver.dni,
        travelEntityList[0].driver.address,
        travelEntityList[0].driver.phoneNumber
      ),
    );
  }

  async save(travel: TravelSaveCommand ): Promise<Travel> {
    const maxID = await this.travelEntity.max("id");
    const newID = maxID ? (parseInt(maxID.toString()) + 1) : 1;

    const travelEntity = await this.travelEntity.create( {
      id: newID,
      passenger_id: travel.passengerId,
      driver_id: travel.driverId,
      status: "Active"
    });

    const travelCreated = await this.travelEntity.findAll({
      where:{
        id: travelEntity.id
      },
      include: [
        DriverEntity,
        PassengerEntity,
      ]
    })

    return Travel.fromPrimitives(
      travelCreated[0].id,
      travelCreated[0].status,
      Passenger.fromPrimitives(
        travelCreated[0].passenger.id,
        travelCreated[0].passenger.firstName,
        travelCreated[0].passenger.lastName,
        travelCreated[0].passenger.dni,
        travelCreated[0].passenger.address,
        travelCreated[0].passenger.phoneNumber
      ),
      Driver.fromPrimitives(
        travelCreated[0].driver.id,
        travelCreated[0].driver.firstName,
        travelCreated[0].driver.lastName,
        travelCreated[0].driver.dni,
        travelCreated[0].driver.address,
        travelCreated[0].driver.phoneNumber
      ),
    );
  }
  
  async completed(id: number ): Promise<Travel> {
    const travel = await this.travelEntity.findByPk(id);

    if(!travel){
      throw new HttpException("Travel not found", HttpStatus.NOT_FOUND);
    }

    await travel.update({
      status: 'Complete'
    })
    await travel.save()

    const travelCreated = await this.travelEntity.findAll({
      where:{
        id
      },
      include: [
        DriverEntity,
        PassengerEntity,
      ]
    })

    return Travel.fromPrimitives(
      travelCreated[0].id,
      travelCreated[0].status,
      Passenger.fromPrimitives(
        travelCreated[0].passenger.id,
        travelCreated[0].passenger.firstName,
        travelCreated[0].passenger.lastName,
        travelCreated[0].passenger.dni,
        travelCreated[0].passenger.address,
        travelCreated[0].passenger.phoneNumber
      ),
      Driver.fromPrimitives(
        travelCreated[0].driver.id,
        travelCreated[0].driver.firstName,
        travelCreated[0].driver.lastName,
        travelCreated[0].driver.dni,
        travelCreated[0].driver.address,
        travelCreated[0].driver.phoneNumber
      ),
    );
  }
}
