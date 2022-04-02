import { ApolloError } from 'apollo-server-express';
import { CtErrorType } from '@src/common/error/ct-error-type';

/**
 *
 */
export class CtError extends ApolloError {
  constructor(code: CtErrorType, message?: string) {
    super(message || code, code);
  }
}
