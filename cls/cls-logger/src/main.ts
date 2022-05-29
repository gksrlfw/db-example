import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressMiddlewareCls } from './common/wrap/cls-trace';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(expressMiddlewareCls());

  await app.listen(3000);
}
bootstrap();
