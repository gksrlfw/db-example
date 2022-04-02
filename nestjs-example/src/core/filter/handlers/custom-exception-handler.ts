import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { GqlContextType } from '@nestjs/graphql';
import { ScErrorTypes } from '../types/sc-error.types';

/**
 *
 */
export abstract class CustomExceptionHandler {
  private readonly logger: Logger = new Logger(this.constructor.name);

  /**
   *
   * @param exception
   * @param host
   */
  handleException(exception: ScErrorTypes, host: ArgumentsHost): any {
    if (host.getType<GqlContextType>() === 'graphql') {
      return this.graphql(exception, host);
    }

    this.logger.debug(
      `처리되지 않은 오류 유형입니다. 파악 후에 handler 를 추가해주세요.`,
    );

    this.logger.debug(`host type: ${host.getType}`);

    return new HttpException(
      'UnhandledError',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /**
   *
   * @param exception
   * @param host
   */
  abstract graphql(exception: ScErrorTypes, host: ArgumentsHost): ApolloError;
}
