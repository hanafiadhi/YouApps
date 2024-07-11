import { ApiProperty } from '@nestjs/swagger';

export class loginResponeSuccess {
  @ApiProperty()
  username: '0910010';
  @ApiProperty()
  role: Array<string>;
  @ApiProperty({
    required: true,
    type: 'string',
    example:
      'eyJzdWIiOiI2NjU1NTVkYTMzMDgwMTlkYzY1OWEzMjciLCJpYXQiOjE3MTY4Njg5MzUsImV4cCI6MTcxNjg2ODk2NSwiYXVkIjoibG9jYWxob3N0OjMwMDAiLCJpc3MiOiJsb2NhbGhvc3Q6MzAwMCJ9',
    description:
      'access token ini akan di gunakan di setiap request yang membutuhkan',
  })
  accessToken: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example:
      'eyJzdWIiOiI2NjU1NTVkYTMzMDgwMTlkYzY1OWEzMjciLCJpYXQiOjE3MTY4Njg5MzUsImV4cCI6MTcxNjg2ODk2NSwiYXVkIjoibG9jYWxob3N0OjMwMDAiLCJpc3MiOiJsb2NhbGhvc3Q6MzAwMCJ9',
    description: 'refresh token digunakan ketika token sudah habis',
  })
  refreshToken: string;
}

export class registerResponeSuccess{
@ApiProperty({
    example:201
})
stausCode:201
@ApiProperty({
    example:"Congratulations You Have Successfully Created an Account"
})
message:string
}
