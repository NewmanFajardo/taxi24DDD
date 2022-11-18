import { ApiProperty } from '@nestjs/swagger';
import { Passenger } from '../../domain/passenger.domain';

export class PassengerResponse {
  @ApiProperty({
    example: '1',
    description: 'ID',
  })
  id: number;

  @ApiProperty({
    example: 'firstName',
    description: 'firstName',
  })
  firstName: string;
  
  @ApiProperty({
    example: 'lastName',
    description: 'lastName',
  })
  lastName: string;
  
  @ApiProperty({
    example: 'DNI',
    description: 'dni',
  })
  dni: number;
  
  @ApiProperty({
    example: 'address',
    description: 'address',
  })
  address: string;
  
  @ApiProperty({
    example: 'phoneNumber',
    description: 'phoneNumber',
  })
  phoneNumber: number;

  constructor(passenger: Passenger) {
    this.id = passenger.id.value;
    this.firstName = passenger.firstName.value;
    this.lastName = passenger.lastName.value;
    this.dni = passenger.dni.value;
    this.address = passenger.address.value;
    this.phoneNumber = passenger.phoneNumber.value;
  }
}
