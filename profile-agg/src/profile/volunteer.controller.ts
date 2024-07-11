import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Version,
  Query,
  Res,
  Inject,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  UnprocessableEntityException,
  ParseBoolPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { VolunteerService as ProfileService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-profile.dto';
import { UpdateProfilBody, UpdateVolunteerDto } from './dto/update-profile.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHideProperty,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  ErrorBadRequestExecption,
  ErrorNotFoundExeption,
  ErrorUnauthorizedException,
  ProfileResponse,
} from '@app/common';
import { ActiveUser } from '../decorator/active-user.decorator';
import { ConfigService } from '@nestjs/config';
import {
  DeletingData,
  Pagination,
} from '../common/swagger/api/respone/response.success';
import { Response } from 'express';
import { AccessTokenGuard } from '../guard/acccess-token.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { MongoIdValidationPipe } from '../pipes/validator/mongoid.validator';

@ApiBearerAuth('jwt')
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly volunteerService: ProfileService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @Version('1')
  @ApiTags('Profile')
  @ApiOperation({
    summary: 'Pencarian volunteer secara handal',
    description: `Dalam api ini bisa:\n
        1. Mencari data field\n
        2. Menampilkan beberapa field (data yang dibutuhkan, Multiple)\n
        3. Sorting (ASC/DESC ,Multiple field) ex:-created_at\n
        4. Pagination \n`,
    externalDocs: {
      url: 'http://localhost:3001/user?username[regex]=hanafi&page=1&limit=10&fields=username,role&sort=-username',
      description: `
        Ex: pencarian handal. \n
        1. filds[regex]=value -> mencari string di suatu field yang mengandung kata dari value(case in sensitive) ex:username[regex]=hanafi\n
        2. filds[in]=value -> mencari sebuah string dalam filed yang bertipe array string\n
        3. filds[eq]=value -> mencari sebuah kata yang sama dengan value pada fild yang di cari(case Sensitive)\n
        4. fileds[ne]=value -> mencari data yang tidak sama dengan value pada sebuah field\n
        5. fields[or]=value -> mengkombine beberapa filed untuk mencari data tertentu
      `,
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'fields', required: false, type: String })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: Pagination })
  findAll(@ActiveUser() activeUser: any, @Query() query: any) {
    this.logger.info({
      user_id: activeUser.sub,
      username: activeUser.username,
      query,
    });
    return this.volunteerService.findAll(query);
  }

  @Get('/me/getProfile')
  @Version('1')
  @ApiTags('Me')
  @ApiOperation({ summary: 'melihat profil saya' })
  @ApiOkResponse({ type: ProfileResponse })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  async findMe(@ActiveUser() { sub }: any) {
    const result = await this.volunteerService.findAll({
      page: '1',
      limit: '1',
      user_id: { eq: sub },
    });

    return (
      result['data'][0] ??
      new BadRequestException('Data tidak ditemukan').getResponse()
    );
  }

  @ApiHideProperty()
  @Patch('/me/updateProfil')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    }),
  )
  @Version('1')
  @ApiTags('Me')
  @ApiOperation({ summary: 'update my profil' })
  @ApiOkResponse({ type: ProfileResponse })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @ApiBody({ type: UpdateProfilBody })
  async updateMe(
    @ActiveUser() { sub }: any,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    const result = await this.volunteerService.findAll({
      page: '1',
      limit: '1',
      user_id: { eq: sub },
      fields: '_id',
    });
    updateVolunteerDto.user_id = sub;
    if (!result['data'][0]) {
      return this.volunteerService.create(updateVolunteerDto);
    }
    return await this.volunteerService.update(updateVolunteerDto);
  }
}
