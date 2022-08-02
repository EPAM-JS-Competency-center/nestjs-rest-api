import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { CustomExceptionFilter } from './exception-filters/custom.exception-filter';

const appPort = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());

  await app
    .listen(appPort)
    .then(() => console.log(`App is up and running on PORT: ${ appPort }`));
}
bootstrap();
