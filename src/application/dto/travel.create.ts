import { ApiProperty } from '@nestjs/swagger';

export class TravelCreate {
  @ApiProperty({
    example: '1',
    description: 'Id passenger',
  })
  passengerId: number;
  
  @ApiProperty({
    example: '1',
    description: 'Id driver',
  })
  driverId: number;
}
