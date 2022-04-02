import { CustomExceptionHandler } from './custom-exception-handler';
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';

/**
 * httpException 관련 에러를 처리합니다.
 */
export class HttpExceptionHandler extends CustomExceptionHandler {
  graphql(exception: HttpException, host: ArgumentsHost): ApolloError {
    const apolloError = new ApolloError(
      exception.message,
      exception.getStatus().toString(10),
      {
        type: exception.name,
      },
    );
    apolloError.stack = exception.stack;
    apolloError.originalError = exception;
    return apolloError;
  }
}
