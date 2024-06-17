import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}
