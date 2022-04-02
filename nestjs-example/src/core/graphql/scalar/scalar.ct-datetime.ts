import { Logger } from '@nestjs/common';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { CtDatetime } from '@src/common/date/ct-datetime';
import { CtDayjsFormat } from '@src/common/date/ct-dayjs-format';
import { DateScalarFactory } from '@src/core/graphql/factories/date-scalar-factory';
import { CtDayjs } from '@src/common/date/ct-dayjs';

@Scalar('CtDatetime')
export class ScalarCtDatetime implements CustomScalar<string, CtDatetime> {
  // constructor 로 DI 를 하면 SxDate 이랑 공유되는 무엇인가 있는것 같습니다.
  private readonly logger: Logger = new Logger(this.constructor.name);
  defaultFormat = CtDayjsFormat.YMDTHMSZ;

  constructor(private readonly dateScalarFactory: DateScalarFactory) {}

  /**
   * client 가 전송한 parameter 에 대한 처리를 합니다.
   * @param ast
   */
  parseLiteral(ast: ValueNode): CtDayjs {
    return this.dateScalarFactory.parseLiteral(ast, this.defaultFormat);
  }

  /**
   * GraphQL 에서 variable 사용 시 호출됩니다.
   * @param value
   */
  parseValue(value: string): CtDayjs {
    return this.dateScalarFactory.parseValue(value, this.defaultFormat);
  }

  /**
   * client 로 응답 줄 때
   * @param value
   */
  serialize(value: CtDayjs): string {
    return this.dateScalarFactory.serialize(value, this.defaultFormat);
  }
}
