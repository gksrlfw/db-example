import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedDateType extends HttpException {
  constructor(message?: string) {
    super(message || 'UnsupportedDateType', HttpStatus.BAD_REQUEST);
  }
}
