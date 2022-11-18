import { ApiProperty } from '@nestjs/swagger';
import { Passenger } from '../../domain/passenger.domain';

export class PassengerCreate {
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
    example: '1234567',
    description: 'dni',
  })
  dni: number;
  
  @ApiProperty({
    example: 'address',
    description: 'address',
  })
  address: string;
  
  @ApiProperty({
    example: '123654',
    description: 'phoneNumber',
  })
  phoneNumber: number;

  constructor(passenger: Passenger) {
    this.firstName = passenger.firstName.value;
    this.lastName = passenger.lastName.value;
    this.dni = passenger.dni.value;
    this.address = passenger.address.value;
    this.phoneNumber = passenger.phoneNumber.value;
  }
}
