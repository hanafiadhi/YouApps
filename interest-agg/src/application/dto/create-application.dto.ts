import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
export class CreateApplicationDto {
  @ApiProperty({
    description: 'silahkan masukan name yang akan di gunakan',
    example: 'Dashboard',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()  
  name: string; 
}
