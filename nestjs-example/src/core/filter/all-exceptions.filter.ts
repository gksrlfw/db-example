import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ErrorHandlerFactory } from './factories/error-handler-factory';
import { ScErrorTypes } from './types/sc-error.types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly errorInstanceFactory: ErrorHandlerFactory) {}

  /**
   *
   * @param exception
   * @param host
   */
  catch(exception: ScErrorTypes, host: ArgumentsHost): any {
    // this.logger.debug(`AllExceptionFilter start: exception: ${exception}`);
    return this.errorInstanceFactory
      .getErrorHandler(exception)
      .handleException(exception, host);
  }
}
