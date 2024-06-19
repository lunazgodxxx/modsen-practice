import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {
  @ApiProperty({
    default: 'Yahor',
  })
  readonly username: string;

  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  readonly password: string;
}
