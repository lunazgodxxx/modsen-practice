import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetupDto {
  @ApiProperty()
  theme: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  tags: string[];

  @ApiProperty()
  place: string;
  @ApiProperty()
  time: Date;
}
