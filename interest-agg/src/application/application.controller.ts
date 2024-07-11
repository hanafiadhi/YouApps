import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Patch,
  Body,
  Version,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveApplication } from 'src/decorator/active-application.decorator';
import { ApplicationResSuccesCreate } from '../common/swagger/api/respone/application.respone';
import {
  ErrorBadRequestExecption,
  ErrorNotFoundExeption,
} from '../common/swagger/api/respone/response.error';
import { Response } from 'express';
import {
  DeletingData,
  Pagination,
} from '../common/swagger/api/respone/response.success';
import { AccessTokenGuard } from 'src/guard/acccess-token.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorator/roles.decorator';
import { Roles } from 'src/common/enum/role.enum';

@ApiBearerAuth('jwt')
@UseGuards(AccessTokenGuard, RoleGuard)
@Role(Roles.ROOT)
@ApiTags('Interest')
@Controller('interest')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Version('1')
  @ApiOperation({ summary: 'create application' })
  @ApiCreatedResponse({ type: ApplicationResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @Post()
  createv2(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Reliable interest search',
    description: `This API allows:\n
        1. Searching data based on required fields\n
        2. Displaying multiple fields (required data, Multiple) e.g., username, email\n
        3. Sorting (ASC/DESC, Multiple fields) e.g., -username\n
        4. Pagination\n`,
    externalDocs: {
      url: '?username[regex]=hanafi&page=1&limit=10&fields=username,role&sort=-username',
      description: `
        Example: reliable search.\n
        1. fields[regex]=value -> search fields that contain the desired value, e.g., username[regex]=hanafi\n
        2. fields[in]=value -> search fields that contain the desired value of string array type\n
        3. fields[eq]=value -> search fields that contain the desired value (case sensitive)\n
        4. fields[ne]=value -> search fields that do not contain the undesired value\n
        5. fields[or]=value -> search fields that contain the desired value and can be combined
      `,
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'fields', required: false, type: String })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: Pagination })
  findAll(@Query() query: any) {
    return this.applicationService.findAll(query);
  }

  @Version('1')
  @ApiOperation({ summary: 'find one interest' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '_id mongodb',
  })
  @ApiOkResponse({ type: ApplicationResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Get('/:id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.applicationService.findOne(id);
  }

  @Version('1')
  @Patch('/:id')
  @ApiOperation({ summary: 'update one interest' })
  @ApiOkResponse({ type: ApplicationResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @ApiParam({
    name: 'id',
    required: true,
    description: '_id',
  })
  update(
    @Param('id', MongoIdValidationPipe) applicationId: string,
    @Payload() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(applicationId, updateApplicationDto);
  }

  @Version('1')
  @ApiOperation({ summary: 'remove one dashboard' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'mongo _id',
  })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: DeletingData })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    await this.applicationService.remove(id);
    return response.status(200).json({
      message: 'Successfuly remove interest',
      statuCode: 200,
    });
  }
}
