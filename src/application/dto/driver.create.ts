import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../../domain/driver.domain';

export class DriverCreate {
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

  constructor(driver: Driver) {
    this.firstName = driver.firstName.value;
    this.lastName = driver.lastName.value;
    this.dni = driver.dni.value;
    this.address = driver.address.value;
    this.phoneNumber = driver.phoneNumber.value;
  }
}
