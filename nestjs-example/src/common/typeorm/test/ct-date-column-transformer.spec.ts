import { CtDateColumnTransformer } from '@src/common/typeorm/ct-date-column-transformer';
import { CtDate } from '@src/common/date/ct-date';

describe('CtDateColumnTransformer 테스트', () => {
  const YMD = '2021-12-11';

  it('from test', () => {
    const input = CtDateColumnTransformer.from(YMD);
    const result = new CtDate(YMD);

    expect(input).toEqual(result);
  });

  it('to test', () => {
    const ctDate = new CtDate(YMD);

    const input = CtDateColumnTransformer.to(ctDate);
    const result = new CtDate(YMD).format();

    expect(input).toEqual(result);
  });
});
