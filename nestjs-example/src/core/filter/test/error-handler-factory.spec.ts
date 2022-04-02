import { ErrorHandlerFactory } from '@src/core/filter/factories/error-handler-factory';
import { ErrorHandler } from '@src/core/filter/handlers/error.handler';
import { CtErrorHandler } from '@src/core/filter/handlers/sc-error-handler';
import { TypeORMError } from 'typeorm';
import { CtError } from '@src/common/error/ct-error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmHandler } from '@src/core/filter/handlers/type-orm-handler';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { HttpExceptionHandler } from '@src/core/filter/handlers/http-exception-handler';

describe('ErrorHandlerFactory 테스트', () => {
  it('getErrorHandler() 테스트', () => {
    const errorHandler = new ErrorHandlerFactory();

    expect(
      errorHandler.getErrorHandler(new Error()) instanceof ErrorHandler,
    ).toBeTruthy();
    expect(
      errorHandler.getErrorHandler(
        new CtError(CtErrorType.UnhandledError),
      ) instanceof CtErrorHandler,
    ).toBeTruthy();
    expect(
      errorHandler.getErrorHandler(new TypeORMError()) instanceof
        TypeOrmHandler,
    ).toBeTruthy();
    expect(
      errorHandler.getErrorHandler(
        new HttpException('test', HttpStatus.INTERNAL_SERVER_ERROR),
      ) instanceof HttpExceptionHandler,
    ).toBeTruthy();
    expect(
      errorHandler.getErrorHandler(new Error()) instanceof ErrorHandler,
    ).toBeTruthy();
    expect(
      errorHandler.getErrorHandler(new TypeORMError()) instanceof ErrorHandler,
    ).toBeFalsy();
  });
});
