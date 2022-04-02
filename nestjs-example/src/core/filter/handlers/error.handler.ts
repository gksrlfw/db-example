import { CustomExceptionHandler } from './custom-exception-handler';
import { ArgumentsHost } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';

/**
 * Error 관련 에러를 처리합니다.
 */
export class ErrorHandler extends CustomExceptionHandler {
  graphql(exception: Error, host: ArgumentsHost): ApolloError {
    const apolloError = new ApolloError(exception.message, exception.name);
    apolloError.stack = exception.stack;
    apolloError.originalError = exception;
    return apolloError;
  }
}
