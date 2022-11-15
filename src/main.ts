import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

export const serviceHost = 'localhost';
export const servicePort = 10001;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${serviceHost}:${servicePort}`,
      package: 'hello',
      protoPath: 'src/hello/hello.proto',
    },
  });
  await app.listen();

  Logger.log(
    `Microservice is listening on ${serviceHost}:${servicePort}`,
    'Bootstrap',
  );
}
bootstrap();
