import { ConsoleLogger } from '@nestjs/common';
import { clsNamespace } from '../wrap/cls-trace';

/**
 * Todo. Logger extends 조금 더.....
 */
export class MyLogger extends ConsoleLogger {
  // undefined
  // private requestId = clsNamespace.get('requestId');
  debug(message: any, context?: string) {
    const requestId = clsNamespace.get('requestId');
    if (context) {
      super.debug(this.getRequestIdMessage(requestId) + message, context);
    } else {
      super.debug(this.getRequestIdMessage(requestId) + message);
    }
  }

  error(message: any, stack?: string, context?: string) {
    const requestId = clsNamespace.get('requestId');
    if (stack && context) {
      super.error(
        this.getRequestIdMessage(requestId) + message,
        stack,
        context,
      );
    } else if (stack) {
      super.error(this.getRequestIdMessage(requestId) + message, stack);
    } else {
      super.error(this.getRequestIdMessage(requestId) + message);
    }
  }

  /**
   *
   * @param requestId
   */
  getRequestIdMessage(requestId: string): string {
    return `[REQUEST_ID: ${requestId}] `;
  }
}
