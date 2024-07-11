import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreateApplicationDto } from '../../../../application/dto/create-application.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ApplicationResSuccesCreate extends PartialType(
  CreateApplicationDto,
) {
  @ApiProperty({
    description: 'Id auto generate dari mongodb',
    example: '66580386572c487d00eef243',
    uniqueItems: true,
  })
  _id: string;
  @ApiProperty({
    description: 'Please insert the name interest',
    example: 'Coding',
    uniqueItems: true,
  })
  name: string;
}
