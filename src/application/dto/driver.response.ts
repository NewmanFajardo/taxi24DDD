import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../../domain/driver.domain';

export class DriverResponse {
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

  constructor(driver: Driver) {
    this.id = driver.id.value;
    this.firstName = driver.firstName.value;
    this.lastName = driver.lastName.value;
    this.dni = driver.dni.value;
    this.address = driver.address.value;
    this.phoneNumber = driver.phoneNumber.value;
  }
}
