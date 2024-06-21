import { ApiProperty } from '@nestjs/swagger';

export class ReponseUserDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  email: string;
  @ApiProperty({})
  username: string;

  @ApiProperty({})
  roles: string[];

  @ApiProperty({})
  createdAt: Date;
  @ApiProperty({})
  updatedAt: Date;
}
