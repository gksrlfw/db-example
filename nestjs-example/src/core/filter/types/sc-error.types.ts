import { HttpException } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { CtError } from '@src/common/error/ct-error';

export type ScErrorTypes =
  | HttpException
  | CtError
  | TypeORMError
  | Error
  | unknown;
