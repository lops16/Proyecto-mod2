import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.strategy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get(`auth/login`)
  getProfile(@Request() req){
    return req.user
  }
  getHello(): string {
    return this.appService.getHello();
  }
}
