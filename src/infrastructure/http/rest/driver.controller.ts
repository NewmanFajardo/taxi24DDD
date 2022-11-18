import { Controller, Get, UseFilters, Param, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../filters/http-exception.filter';

import { DriverResponse } from '../../../application/dto/driver.response';
import { DriverCreate } from '../../../application/dto/driver.create';
import { DriverFindQuery } from '../../../application/driver/find/driver.find.query';
import { DriverFindOneQuery } from '../../../application/driver/findOne/driver.findOne.query';
import { DriverSaveCommand } from '../../../application/driver/save/driver.save.command';

@ApiTags('driver')
@Controller('driver')
@UseFilters(new HttpExceptionFilter())
export class DriverController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Find all drivers',
  })
  @ApiOkResponse({
    description: 'All rows has been returned',
    type: [DriverResponse],
  })
  async getAll(): Promise<DriverResponse[]> {
    try {
      return this.queryBus.execute(new DriverFindQuery());
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Find driver',
  })
  @ApiOkResponse({
    description: 'Find driver',
    type: DriverResponse,
  })
  async getOne(
    @Param('id') id: number

  ): Promise<DriverResponse> {
    try {
      const driver = new DriverFindOneQuery();
      driver.id = id;
      
      return this.queryBus.execute(driver);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'create driver',
  })
  @ApiCreatedResponse({
    description: 'create driver',
    type: DriverResponse,
  })
  @ApiBody({ type: DriverCreate })
  async save(
    @Body() driver: DriverCreate,
  ): Promise<DriverResponse> {
    try {
      const data = new DriverSaveCommand();
      data.firstName = driver.firstName;
      data.lastName = driver.lastName;
      data.dni = driver.dni;
      data.address = driver.address;
      data.phoneNumber = driver.phoneNumber;

      return await this.commandBus.execute(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
