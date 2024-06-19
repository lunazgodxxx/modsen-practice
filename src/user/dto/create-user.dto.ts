import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

/**
 * try to merge all dtos in one class (https://www.npmjs.com/package/nestjs-joi)
 */
export class CreateUserDto {
  @ApiProperty({
    default: 'Yahor',
  })
  @JoiSchema(Joi.string().required())
  readonly username: string;

  @ApiProperty({
    default: 'lunazgodxxx@gmail.com',
  })
  @JoiSchema(Joi.string().required())
  readonly email: string;

  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  @JoiSchema(Joi.string().required())
  readonly password: string;
}
