import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class AuthenticationDto {
  @ApiProperty({
    default: 'Yahor',
  })
  @JoiSchema(Joi.string().required())
  readonly username: string;

  @ApiProperty({
    default: 'yahormaksimchyk',
  })
  @JoiSchema(Joi.string().required())
  readonly password: string;
}
