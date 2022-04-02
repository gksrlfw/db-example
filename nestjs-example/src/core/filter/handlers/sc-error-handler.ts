import { CustomExceptionHandler } from './custom-exception-handler';
import { ArgumentsHost } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { CtError } from '@src/common/error/ct-error';

/**
 * CtError 를 처리합니다.
 */
export class CtErrorHandler extends CustomExceptionHandler {
  graphql(exception: CtError, host: ArgumentsHost): ApolloError {
    const apolloError = new ApolloError(
      exception.message,
      exception.extensions?.code,
      {
        type: exception.name,
      },
    );
    apolloError.stack = exception.stack;
    apolloError.originalError = exception;
    return apolloError;
  }
}
