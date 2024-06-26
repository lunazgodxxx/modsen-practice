import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class FindAllPaginationDto {
  @JoiSchema(Joi.number().optional().positive())
  readonly page?: number;

  @JoiSchema(Joi.number().optional().positive())
  readonly limit?: number;

  constructor(page = 1, limit = 10) {
    this.limit = limit;
    this.page = page;
  }
}
