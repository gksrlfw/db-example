import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

/**
 * npm run make:schema
 */
(async () => {
  console.log(
    '----------------------------------------------------------------------------------------------------',
  );
  console.log('graphql schema 를 이용하여 TS class 를 생성합니다.');
  await new GraphQLDefinitionsFactory().generate({
    typePaths: ['./**/*.graphql'],
    path: join(process.cwd(), './src/core/autogen/schema.graphql.ts'),
    outputAs: 'class',
    customScalarTypeMapping: {
      CtDatetime: 'CtDayjs',
      CtDate: 'CtDayjs',
    },
    additionalHeader: "import { CtDayjs } from '@src/common/date/ct-dayjs'",
  });
  console.log('Finished successfully.');
  console.log(
    '----------------------------------------------------------------------------------------------------',
  );
})();
