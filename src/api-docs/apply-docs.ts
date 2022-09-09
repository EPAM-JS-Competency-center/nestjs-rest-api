import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import AppConfig from '../app.config';

export const applyDocs = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('AWS RDS PostgreSQL REST API')
    .setDescription('AWS RDS PostgreSQL REST API sample')
    .setVersion(new AppConfig().build().serviceVersion)
    .addTag('rds')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  return document;
};
