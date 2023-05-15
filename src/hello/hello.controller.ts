import { Controller } from '@nestjs/common';
import { HelloService } from './hello.service';
import {
  GetHelloRequest,
  GetHelloResponse,
  HelloServiceController,
  HelloServiceControllerMethods,
} from '../grpc/app.proto';

@Controller()
@HelloServiceControllerMethods()
export class HelloController implements HelloServiceController {
  constructor(private readonly helloService: HelloService) {}

  getHello(req: GetHelloRequest): GetHelloResponse {
    return { message: this.helloService.getHello() };
  }
}
