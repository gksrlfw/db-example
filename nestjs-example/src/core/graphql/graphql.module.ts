import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DateScalarFactory } from '@src/core/graphql/factories/date-scalar-factory';
import { ScalarCtdate } from '@src/core/graphql/scalar/scalar.ct-date';
import { ScalarCtDatetime } from '@src/core/graphql/scalar/scalar.ct-datetime';
import { CtErrorType } from '@src/common/error/ct-error-type';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      definitions: {
        path: join(process.cwd(), './src/core/autogen/schema.graphql.ts'),
        outputAs: 'class',
        customScalarTypeMapping: {
          CtDatetime: 'CtDayjs',
          CtDate: 'CtDayjs',
        },
        additionalHeader: "import { CtDayjs } from '@src/common/date/ct-dayjs'",
      },
      formatError: (error) => {
        return {
          type: error?.extensions?.type || 'Error',
          message: error?.message || '에러 메세지가 없습니다.',
          path: error?.path || [],
          code: error?.extensions?.code || CtErrorType.InternalServerError,
        };
      },
    }),
  ],
  providers: [DateScalarFactory, ScalarCtdate, ScalarCtDatetime],
})
export class GraphqlModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);

  async onModuleInit(): Promise<void> {
    this.logger.debug(`GraphqlModule Init`);
  }
}
