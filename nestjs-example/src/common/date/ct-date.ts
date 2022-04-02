import { CtDayjs } from '@src/common/date/ct-dayjs';
import dayjs from 'dayjs';
import { CtDayjsFormat } from '@src/common/date/ct-dayjs-format';

/**
 *
 */
export class CtDate extends CtDayjs {
  defaultFormat = CtDayjsFormat.YMD;

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
    return new CtDate(dayjs());
  }
}
