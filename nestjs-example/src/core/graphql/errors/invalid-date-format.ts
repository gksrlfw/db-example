import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDateFormat extends HttpException {
  constructor(message?: string) {
    super(message || 'InvalidDateFormat', HttpStatus.BAD_REQUEST);
  }
}
