import { Kind, ValueNode } from 'graphql';
import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { CtDayjsFormat } from '@src/common/date/ct-dayjs-format';
import { UnsupportedDateType } from '@src/core/graphql/errors/unsupported-date-type';
import { InvalidDateFormat } from '@src/core/graphql/errors/invalid-date-format';
import { CtDayjs } from '@src/common/date/ct-dayjs';
import { CtDate } from '@src/common/date/ct-date';
import { CtDatetime } from '@src/common/date/ct-datetime';

/**
 * 각 scalar 타입에 정의하는 것이 좋아보입니다..
 */
@Injectable()
export class DateScalarFactory {
  parseLiteral(ast: ValueNode, format: CtDayjsFormat): CtDayjs {
    if (ast.kind !== Kind.STRING) {
      throw new UnsupportedDateType();
    }

    // fixme 필요하다면 format, strict: true 를 설정합니다.
    const datetime = dayjs(ast.value);
    if (!datetime.isValid()) {
      throw new InvalidDateFormat();
    }

    if (format === CtDayjsFormat.YMD) {
      return new CtDate(datetime.startOf('day'));
    }

    return new CtDatetime(datetime);
  }

  parseValue(value: string, format: CtDayjsFormat): CtDayjs {
    const datetime = dayjs(value, format, true);
    if (!datetime.isValid()) {
      throw new InvalidDateFormat();
    }

    if (format === CtDayjsFormat.YMD) {
      // 년월일 까지만 나타내는 data type 이므로 time 은 truncate 합니다.
      return new CtDate(dayjs(datetime.startOf('day')));
    }

    return new CtDatetime(datetime);
  }

  serialize(value: CtDayjs, format: CtDayjsFormat): string {
    return value.format(format);
  }
}
