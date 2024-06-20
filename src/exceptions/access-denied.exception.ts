import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDeniedException extends HttpException {
  constructor() {
    super('Access Denied', HttpStatus.FORBIDDEN);
  }
}
