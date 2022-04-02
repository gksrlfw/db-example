import { CtDate } from '@src/common/date/ct-date';
import { CtDatetime } from '@src/common/date/ct-datetime';
import { CtDayjs } from '@src/common/date/ct-dayjs';

describe('CtDayjs 테스트', () => {
  const YMD = '2021-12-11';
  const YMDHMS = '2021-12-11 10:11:12';

  it('타입 테스트', () => {
    const ctDate = new CtDate(YMD);
    const ctDatetime = new CtDatetime(YMD);

    expect(ctDate instanceof CtDayjs).toBeTruthy();
    expect(ctDatetime instanceof CtDayjs).toBeTruthy();
  });

  it('다형성 테스트', () => {
    const ctDate = new CtDate(YMDHMS);
    const ctDatetime = new CtDatetime(YMDHMS);

    function print(value: CtDayjs): string {
      return value.format();
    }

    expect(print(ctDate)).toEqual('2021-12-11');
    expect(print(ctDatetime)).toEqual('2021-12-11T10:11:12+09:00');
  });
});
