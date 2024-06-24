import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class FindAllPaginationDto {
  @JoiSchema(Joi.number().optional().positive())
  @ApiProperty({})
  readonly page?: number;

  @JoiSchema(Joi.number().optional().positive())
  @ApiProperty({})
  readonly limit?: number;

  constructor(page: number = 1, limit: number = 10) {
    this.limit = limit;
    this.page = page;
  }
}
