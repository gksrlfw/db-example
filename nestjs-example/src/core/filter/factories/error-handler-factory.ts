import { HttpExceptionHandler } from '../handlers/http-exception-handler';
import { HttpException, Injectable, Scope } from '@nestjs/common';
import { UnhandledExceptionHandler } from '../handlers/unhandled-exception-handler';
import { CustomExceptionHandler } from '../handlers/custom-exception-handler';
import { ScErrorTypes } from '../types/sc-error.types';
import { TypeOrmHandler } from '../handlers/type-orm-handler';
import { TypeORMError } from 'typeorm';
import { ErrorHandler } from '../handlers/error.handler';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorHandler } from '@src/core/filter/handlers/sc-error-handler';

@Injectable()
export class ErrorHandlerFactory {
  /**
   * 에러 타입에 맞는 핸들러를 반환합니다.
   * @param type
   */
  getErrorHandler(type: ScErrorTypes): CustomExceptionHandler {
    switch (true) {
      case type instanceof CtError:
        return new CtErrorHandler();
      case type instanceof TypeORMError:
        return new TypeOrmHandler();
      case type instanceof HttpException:
        return new HttpExceptionHandler();
      case type instanceof Error:
        return new ErrorHandler();
      default:
        return new UnhandledExceptionHandler();
    }
  }
}
