import { CtDayjs } from '@src/common/date/ct-dayjs';
import { FindOperator } from 'typeorm';
import { CtDayjsFormat } from '@src/common/date/ct-dayjs-format';
import { CtDatetime } from '@src/common/date/ct-datetime';

/**
 *
 */
export const CtDatetimeColumnTransformer = {
  // database 에 입력할 때
  to(value: CtDayjs | FindOperator<any>): string | FindOperator<any> {
    if (value instanceof FindOperator) {
      return value;
    }
    if (value) {
      return value.format(CtDayjsFormat.YMDHMS);
    }
    return null;
  },
  // database 에서 조회할 때
  from(value: string): CtDayjs {
    if (!value) {
      return null;
    }
    return new CtDatetime(value);
  },
};
