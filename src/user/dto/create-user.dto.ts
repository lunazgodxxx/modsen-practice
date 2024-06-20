import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateUserDto {
  @ApiProperty({
    default: 'Yahor',
  })
  @JoiSchema(Joi.string().required())
  readonly username: string;

  @ApiProperty({
    default: 'lunazgodxxx@gmail.com',
  })
  @JoiSchema(Joi.string().email().required())
  readonly email: string;

  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  @JoiSchema(Joi.string().required())
  readonly password: string;
}
