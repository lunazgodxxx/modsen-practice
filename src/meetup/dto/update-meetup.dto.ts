import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateMeetupDto {
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
