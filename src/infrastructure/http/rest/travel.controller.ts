import { Controller, Get, UseFilters, Param, Post, Body, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../filters/http-exception.filter';

import { TravelCreate } from '../../../application/dto/travel.create';
import { TravelSaveCommand } from '../../../application/travel/save/travel.save.command';
import { TravelResponse } from '../../../application/dto/travel.response';
import { TravelFindOneQuery } from '../../../application/travel/findOne/travel.findOne.query';
import { TravelFindCompleteQuery } from '../../../application/travel/findCompleted/travel.findCompleted.query';
import { TravelFindActiveQuery } from '../../../application/travel/findActives/travel.findActives.query';
import { TravelCompletedCommand } from '../../../application/travel/completed/travel.completed.command';

@ApiTags('travel')
@Controller('travel')
@UseFilters(new HttpExceptionFilter())
export class TravelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("/actives")
  @ApiOperation({
    summary: 'Find all travel actives',
  })
  @ApiOkResponse({
    description: 'All travel actives',
    type: [TravelResponse],
  })
  async getActives(): Promise<TravelResponse[]> {
    try {
      return this.queryBus.execute(new TravelFindActiveQuery());
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get("/completed")
  @ApiOperation({
    summary: 'Find all travel completed',
  })
  @ApiOkResponse({
    description: 'All travel completed',
    type: [TravelResponse],
  })
  async getCompleted(): Promise<TravelResponse[]> {
    try {
      return this.queryBus.execute(new TravelFindCompleteQuery());
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Find one travel',
  })
  @ApiOkResponse({
    description: 'Find one travel',
    type: TravelResponse,
  })
  async getOne(
    @Param('id') id: number
  ): Promise<TravelResponse> {
    try {
      const travel = new TravelFindOneQuery();
      travel.id = id;
      
      return this.queryBus.execute(travel);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'create travel',
  })
  @ApiCreatedResponse({
    description: 'create travel',
    type: TravelResponse,
  })
  @ApiBody({ type: TravelCreate })
  async save(
    @Body() travel: TravelCreate,
  ): Promise<TravelResponse> {
    try {
      const data = new TravelSaveCommand();
      data.driverId = travel.driverId;
      data.passengerId = travel.passengerId;

      return await this.commandBus.execute(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("/:id")
  @ApiOperation({
    summary: 'Completed travel',
  })
  @ApiCreatedResponse({
    description: 'Completed travel',
    type: TravelResponse,
  })
  async completed(
    @Param('id') id: number
  ): Promise<TravelResponse> {
    try {
      const data = new TravelCompletedCommand();
      data.id = id;

      return await this.commandBus.execute(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
