import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetupDto {
  @ApiProperty({
    default: 'Daily',
  })
  theme: string;
  @ApiProperty({
    default: 'Daily standup',
  })
  description: string;
  @ApiProperty({
    default: [
      'daily',
      'standup',
      'js',
      'node.js',
      'nest.js',
      'express',
      'modsen',
    ],
  })
  tags: string[];

  @ApiProperty({
    default: 'online',
  })
  place: string;
  @ApiProperty({
    default: new Date(),
  })
  time: Date;
}
