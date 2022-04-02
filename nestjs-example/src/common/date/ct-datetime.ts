import { CtDayjsFormat } from '@src/common/date/ct-dayjs-format';
import dayjs from 'dayjs';
import { CtDayjs } from '@src/common/date/ct-dayjs';

/**
 *
 */
export class CtDatetime extends CtDayjs {
  defaultFormat = CtDayjsFormat.YMDTHMSZ;

  constructor(value: string | dayjs.Dayjs, format?: CtDayjsFormat) {
    super(value, format);
  }

  /**
   *
   */
  format(): string {
    return this.dayjs.format(this.defaultFormat);
  }

  /**
   *
   */
  static now() {
    return new CtDatetime(dayjs());
  }
}
