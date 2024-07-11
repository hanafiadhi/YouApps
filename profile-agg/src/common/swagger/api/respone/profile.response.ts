import { IProfilSchema } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponse implements IProfilSchema {
  @ApiProperty()
  horoscope?: string;
  @ApiProperty()
  zodiac?: string;
  @ApiProperty()
  height: string;
  @ApiProperty()
  weight: string;
  @ApiProperty()
  interest: string[];
  @ApiProperty({
    description: 'Id auto generate dari mongodb',
    example: '66580386572c487d00eef243',
    uniqueItems: true,
  })
  _id: string;

  @ApiProperty({
    description: 'Nama orang',
    example: 'John Doe',
    uniqueItems: true,
  })
  name: string;

  @ApiProperty({
    description: 'umur',
    example: 'pria',
  })
  gender: string;

  @ApiProperty({
    description: 'tanggal lahir',
    example: '2024-06-25',
  })
  birt_date: Date;

  @ApiProperty({
    description: 'status member',
    example: true,
  })
  is_active: boolean;

  @ApiProperty({
    description: '_id generate dari user ',
    example: '60b8d295f1fbbc00a4f6bb4e',
  })
  user_id: string;
}
