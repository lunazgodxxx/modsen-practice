import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  readonly oldPassword: string;
  @ApiProperty({
    default: 'newyahormaksimchyk',
  })
  readonly newPassword: string;
  @ApiProperty({
    default: 'lunazgodxxx@gmail.com',
  })
  readonly email: string;
}
