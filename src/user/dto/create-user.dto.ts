import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'Yahor',
  })
  readonly username: string;
  @ApiProperty({
    default: 'lunazgodxxx@gmail.com',
  })
  readonly email: string;
  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  readonly password: string;
}
