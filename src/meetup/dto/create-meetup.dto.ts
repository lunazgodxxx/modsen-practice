import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateMeetupDto {
  @ApiProperty({
    default: 'Daily',
  })
  @JoiSchema(Joi.string().required())
  theme: string;

  @ApiProperty({
    default: 'Daily standup',
  })
  @JoiSchema(Joi.string().required())
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
  @JoiSchema(Joi.object().required())
  tags: string[];

  @ApiProperty({
    default: 'online',
  })
  @JoiSchema(Joi.string().required())
  place: string;
  @ApiProperty({
    default: new Date(),
  })
  @JoiSchema(Joi.date().required())
  time: Date;
}
