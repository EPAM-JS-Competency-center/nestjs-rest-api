import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './exception-filters/custom.exception-filter';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.APP_PORT || 4000);
  console.log(`App listen on port ${process.env.APP_PORT}`);
}
bootstrap();
