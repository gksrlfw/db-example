import { CtDatetimeColumnTransformer } from '@src/common/typeorm/ct-datetime-column-transformer';
import { CtDatetime } from '@src/common/date/ct-datetime';

describe('CtDatetimeColumnTransformer 테스트', () => {
  const YMDHMS = '2021-12-11 10:11:12';

  it('from test', () => {
    const input = CtDatetimeColumnTransformer.from(YMDHMS);
    const result = new CtDatetime(YMDHMS);

    expect(input).toEqual(result);
  });

  it('to test', () => {
    const ctDate = new CtDatetime(YMDHMS);

    const input = CtDatetimeColumnTransformer.to(ctDate);
    const result = new CtDatetime(YMDHMS).format();

    expect(input).toEqual(result);
  });
});
