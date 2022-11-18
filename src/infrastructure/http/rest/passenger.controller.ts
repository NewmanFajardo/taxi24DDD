import { Controller, Get, UseFilters, Param, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../filters/http-exception.filter';
import { PassengerResponse } from '../../../application/dto/passenger.response';
import { PassengerFindQuery } from '../../../application/passenger/find/passenger.find.query';
import { PassengerFindOneQuery } from '../../../application/passenger/findOne/passenger.findOne.query';
import { PassengerCreate } from '../../../application/dto/passenger.create';
import { PassengerSaveCommand } from '../../../application/passenger/save/passenger.save.command';

@ApiTags('passenger')
@Controller('passenger')
@UseFilters(new HttpExceptionFilter())
export class PassengerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Find all Passengers',
  })
  @ApiOkResponse({
    description: 'All rows has been returned',
    type: [PassengerResponse],
  })
  async getAll(): Promise<PassengerResponse[]> {
    try {
      return this.queryBus.execute(new PassengerFindQuery());
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Find Passenger',
  })
  @ApiOkResponse({
    description: 'Find Passenger',
    type: PassengerResponse,
  })
  async getOne(
    @Param('id') id: number

  ): Promise<PassengerResponse> {
    try {
      const passenger = new PassengerFindOneQuery();
      passenger.id = id;
      
      return this.queryBus.execute(passenger);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'create passenger',
  })
  @ApiCreatedResponse({
    description: 'create passenger',
    type: PassengerResponse,
  })
  // @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: PassengerCreate })
  async savePassenger(
    @Body() passenger: PassengerCreate,
  ): Promise<PassengerResponse> {
    try {
      const data = new PassengerSaveCommand();
      data.firstName = passenger.firstName;
      data.lastName = passenger.lastName;
      data.dni = passenger.dni;
      data.address = passenger.address;
      data.phoneNumber = passenger.phoneNumber;

      return await this.commandBus.execute(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
