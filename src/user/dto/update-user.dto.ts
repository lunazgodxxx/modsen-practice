import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateUserDto {
  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  @JoiSchema(Joi.string().required())
  readonly oldPassword: string;

  @ApiProperty({
    default: 'newyahormaksimchyk',
  })
  @JoiSchema(Joi.string().required())
  readonly newPassword: string;

  @ApiProperty({
    default: 'lunazgodxxx@gmail.com',
  })
  @JoiSchema(Joi.string().email().required())
  readonly email: string;
}
