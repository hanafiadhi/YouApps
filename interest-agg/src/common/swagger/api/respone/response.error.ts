import { ApiProperty } from '@nestjs/swagger';

export class ErrorUnauthorizedException {
  @ApiProperty({
    description: 'Error when Unauthorized',
    example: "You don't have access",
  })
  message: string;
  @ApiProperty({
    description: 'status  when Unauthorized',
    example: '401',
  })
  statusCode: number;
}

export class ErrorBadRequestExecption {
  @ApiProperty({
    description: 'Berisikan validation yang error',
    example: {
      'fild-error': ['message-error'],
    },
  })
  message: Array<string>;
  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;
  @ApiProperty({
    description: 'status code ketika Bad Request',
    example: '400',
  })
  statusCode: number;
}
export class ErrorNotFoundExeption {
  @ApiProperty({
    description:
      'Berisikan validation yang error bisa array string ataupun string saja',
    example: 'Not Found',
  })
  message: Array<string>;
  @ApiProperty({
    example: 'Not Found',
  })
  error: string;
  @ApiProperty({
    example: '404',
  })
  statusCode: number;
}
