import { ConsoleLogger } from '@nestjs/common';

/**
 * 테스트용 로거입니다.
 * error 일 때만 logger 를 실행합니다.
 * debug 일 때도 실행하고 싶으면 주석처리하면 됩니다.
 */
export class LoggerMock extends ConsoleLogger {
  log(message: string): any {}
  // error(message: string, trace: string): any {}
  warn(message: string): any {}
  debug(message: string): any {}
  verbose(message: string): any {}
}
