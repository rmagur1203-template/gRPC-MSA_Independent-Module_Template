import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { grpcClientOptions } from 'shared/lib/options/hello.grpc';
import * as ProtoLoader from '@grpc/proto-loader';
import * as GRPC from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import {
  HELLO_PACKAGE_NAME,
  HELLO_SERVICE_NAME,
} from 'shared/lib/generated/hello';

describe('AppController (e2e)', () => {
  let app: INestMicroservice;
  let client: ServiceClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestMicroservice(grpcClientOptions);

    await app.init();
    await app.listen();

    const proto = ProtoLoader.loadSync(grpcClientOptions.options.protoPath);
    const protoGRPC = GRPC.loadPackageDefinition(proto);
    const packageGRPC = protoGRPC[HELLO_PACKAGE_NAME] as GRPC.GrpcObject;
    const serviceGRPC = packageGRPC[
      HELLO_SERVICE_NAME
    ] as GRPC.ServiceClientConstructor;
    client = new serviceGRPC(
      grpcClientOptions.options.url,
      GRPC.credentials.createInsecure(),
    );
  });

  it('getHello (gRPC)', async () => {
    return new Promise<void>((resolve, reject) => {
      client.getHello({}, function (err, res) {
        if (err) return reject(err);
        expect(res).toEqual({ message: 'Hello World!' });
        resolve();
      });
      setTimeout(() => resolve(), 1000);
    });
  });

  afterAll(async () => {
    client.close();
    await app.close();
  });
});
