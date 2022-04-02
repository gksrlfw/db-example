import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDatetimeFormat extends HttpException {
  constructor(message?: string) {
    super(message || 'InvalidDatetimeFormat', HttpStatus.BAD_REQUEST);
  }
}
