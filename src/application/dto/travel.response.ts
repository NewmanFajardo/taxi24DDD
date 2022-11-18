import { ApiProperty } from '@nestjs/swagger';
import { Travel } from '../../domain/travel.domain';
import { PassengerResponse } from './passenger.response'
import { DriverResponse } from './driver.response'

export class TravelResponse {
  @ApiProperty({
    example: '1',
    description: 'ID',
  })
  id: number;

  @ApiProperty({
    example: 'Status',
    description: 'Status',
  })
  status: string;
  
  @ApiProperty({
    example: 'passenger',
    description: 'passenger',
  })
  passenger: PassengerResponse;
  
  @ApiProperty({
    example: 'driver',
    description: 'driver',
  })
  driver: PassengerResponse;

  constructor(travel: Travel) {
    this.id = travel.id.value;
    this.status = travel.status.value;
    this.passenger = new PassengerResponse(travel.passenger)
    this.driver = new DriverResponse(travel.driver);
  }
}
