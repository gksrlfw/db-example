import { CtDayjs } from '@src/common/date/ct-dayjs';
import { FindOperator } from 'typeorm';
import { CtDate } from '@src/common/date/ct-date';

/**
 *
 */
export const CtDateColumnTransformer = {
  // database 에 입력할 때
  to(value: CtDayjs | FindOperator<any>): string | FindOperator<any> {
    if (value instanceof FindOperator) {
      return value;
    }
    if (value) {
      return value.format();
    }
    return null;
  },
  // database 에서 조회할 때
  from(value: string | Date): CtDayjs {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return new CtDate(value.toString());
    }
    return new CtDate(value);
  },
};
