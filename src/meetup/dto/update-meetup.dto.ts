import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetupDto {
  @ApiProperty()
  place: string;
  @ApiProperty()
  time: Date;
}
