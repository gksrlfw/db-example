import { CustomExceptionHandler } from './custom-exception-handler';
import { ArgumentsHost } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { CtErrorType } from '@src/common/error/ct-error-type';

/**
 * handler 에 정의되지 않은 에러 타입을 처리합니다.
 */
export class UnhandledExceptionHandler extends CustomExceptionHandler {
  graphql(exception: unknown, host: ArgumentsHost): ApolloError {
    const apolloError = new ApolloError(CtErrorType.UnhandledError);
    apolloError.extensions = { exception };
    return apolloError;
  }
}
