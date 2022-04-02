import * as dayjs from 'dayjs';
import { CtDayjsFormat } from '@src/common/date/ct-dayjs-format';

/**
 *
 */
export class CtDayjs {
  private readonly value: dayjs.Dayjs;
  defaultFormat = CtDayjsFormat.YMDTHMSZ;

  constructor(value: string | dayjs.Dayjs, format?: CtDayjsFormat) {
    if (dayjs.isDayjs(value)) {
      this.value = value;
    } else {
      this.value = dayjs(value, format);
    }
  }

  /**
   *
   * @param format
   */
  format(format?: CtDayjsFormat): string {
    return this.value.format(this.defaultFormat);
  }

  /**
   *
   */
  get dayjs(): dayjs.Dayjs {
    return this.value;
  }

  /**
   *
   */
  static now(): CtDayjs {
    return new CtDayjs(dayjs());
  }

  /**
   *
   */
  toYMDHMS(): string {
    return this.value.format(CtDayjsFormat.YMDHMS);
  }
}
