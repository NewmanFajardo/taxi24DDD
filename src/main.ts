import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './infrastructure/ioc/app.module';
import * as routeMap from 'express-routemap';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Prefijo para la publicación de los Istio/Virtual Service.
  const pathPrefix: string = configService.get('PATH_PREFIX') || 'example';
  app.setGlobalPrefix(pathPrefix);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   })
  // )

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription(configService.get('APP_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT') || 3000);

  const server = app.getHttpServer();
  const routes = server._events.request._router;
  
  routeMap(routes);
}

bootstrap();
