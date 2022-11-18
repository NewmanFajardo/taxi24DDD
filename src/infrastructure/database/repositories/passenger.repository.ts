import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassengerSaveCommand } from '../../../application/passenger/save/passenger.save.command';
import { Passenger } from '../../../domain/passenger.domain';
import { PassengerRepository } from '../../../domain/ports/passenger.repository';
import { PassengerEntity } from '../mapper/passenger.entity';

@Injectable()
export class PassengerPostgres implements PassengerRepository {
  constructor(
    @Inject('PassengerModelRepository')
    private passengerEntity: typeof PassengerEntity,
  ) {}

  toJSON(passenger: Passenger): any {
    return {
      id: passenger.id.value,
      firstName: passenger.firstName.value,
      lastName: passenger.lastName.value,
      dni: passenger.dni.value,
      address: passenger.address.value,
      phoneNumber: passenger.phoneNumber.value,
    };
  }

  async findAll(limit: number, offset: number): Promise<Passenger[]> {
    const passengerEntityList = await this.passengerEntity.findAll({
      limit,
      offset,
      include: [],
    });

    return passengerEntityList.map((passenger) => {
      return Passenger.fromPrimitives(
        passenger.id,
        passenger.firstName,
        passenger.lastName,
        passenger.dni,
        passenger.address,
        passenger.phoneNumber
      );
    });
  }

  async findOne(id: number): Promise<Passenger> {
    const passengerEntityList = await this.passengerEntity.findAll({
      where: {
        id
      },
      include: [],
    });

    if(!passengerEntityList.length){
      throw new HttpException("Passenger not found", HttpStatus.NOT_FOUND);
    }

    return Passenger.fromPrimitives(
      passengerEntityList[0].id,
      passengerEntityList[0].firstName,
      passengerEntityList[0].lastName,
      passengerEntityList[0].dni,
      passengerEntityList[0].address,
      passengerEntityList[0].phoneNumber
    );
  }

  async save(passenger: PassengerSaveCommand ): Promise<Passenger> {
    const maxID = await this.passengerEntity.max("id");
    const newID = maxID ? (parseInt(maxID.toString()) + 1) : 1;

    const passengerEntity = await this.passengerEntity.create( {
      id: newID,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dni: passenger.dni,
      address: passenger.address,
      phoneNumber: passenger.phoneNumber,
    } );

    return Passenger.fromPrimitives(
      passengerEntity.id,
      passengerEntity.firstName,
      passengerEntity.lastName,
      passengerEntity.dni,
      passengerEntity.address,
      passengerEntity.phoneNumber
    );
  }
}
