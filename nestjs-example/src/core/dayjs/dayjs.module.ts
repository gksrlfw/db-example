import { Logger, Module, OnModuleInit } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

@Module({})
export class DayjsModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);
  onModuleInit() {
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Seoul');
    this.logger.debug(
      `DayjsModule initialized: Set customParseFormat, utc, timezone`,
    );
  }
}
