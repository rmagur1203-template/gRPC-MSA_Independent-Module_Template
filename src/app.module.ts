import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcClientOptions } from './grpc.option';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    GrpcReflectionModule.register(grpcClientOptions),
    HelloModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
