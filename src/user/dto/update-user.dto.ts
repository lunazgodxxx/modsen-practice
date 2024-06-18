import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  readonly oldPassword: string;
  @ApiProperty()
  readonly newPassword: string;
  @ApiProperty()
  readonly email: string;
}
