import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './common/logging/my.logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly myLogger: MyLogger,
  ) {}

  @Get()
  getHello(): string {
    this.myLogger.debug(`debug`);
    this.myLogger.error('error');
    return this.appService.getHello();
  }
}
