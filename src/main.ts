import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters/http-exception-filter';
import { applyDocs } from './api-docs/apply-docs';
import AppConfig from './app.config';

async function bootstrap() {
  console.info('Bootstraping started');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  applyDocs(app);

  const port = new AppConfig().build().metaData.port;

  console.info(`The app port is ${port}. It's successfully run`);

  await app.listen(port);
}

bootstrap().then();
