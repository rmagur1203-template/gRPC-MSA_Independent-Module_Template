/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hello";

export interface GetHelloRequest {
}

export interface GetHelloResponse {
  message: string;
}

export const HELLO_PACKAGE_NAME = "hello";

export interface HelloServiceClient {
  getHello(request: GetHelloRequest): Observable<GetHelloResponse>;
}

export interface HelloServiceController {
  getHello(request: GetHelloRequest): Promise<GetHelloResponse> | Observable<GetHelloResponse> | GetHelloResponse;
}

export function HelloServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HELLO_SERVICE_NAME = "HelloService";
