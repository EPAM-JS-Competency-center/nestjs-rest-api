import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const applyDocs = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Dynamodb REST API')
    .setDescription('Dynamodb REST API sample')
    .setVersion('1.0')
    .addTag('dynamodb')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  return document;
};
