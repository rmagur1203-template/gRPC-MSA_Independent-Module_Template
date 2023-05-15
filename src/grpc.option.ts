import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const serviceHost = '0.0.0.0';
export const servicePort = 10001;

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: `${serviceHost}:${servicePort}`,
    package: 'app',
    protoPath: 'src/app.proto',
  },
});
