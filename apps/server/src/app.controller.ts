import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExampleDto } from '@shared-dtos/dto';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('voorbeeld')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return { message: 'OK' };
  }

  @Post('example')
  postExample(@Body() payload: ExampleDto) {
    return { payload };
  }
}
