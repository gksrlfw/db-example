import { CustomExceptionHandler } from './custom-exception-handler';
import { ArgumentsHost } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { TypeORMError } from 'typeorm';

/**
 * typeorm 에러를 처리합니다.
 */
export class TypeOrmHandler extends CustomExceptionHandler {
  graphql(exception: TypeORMError, host: ArgumentsHost): ApolloError {
    const apolloError = new ApolloError(exception['code'], exception.name, {
      type: 'DatabaseError',
    });
    apolloError.stack = exception.stack;
    apolloError.originalError = exception;
    return apolloError;
  }
}
