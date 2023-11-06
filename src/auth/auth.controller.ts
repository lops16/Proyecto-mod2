import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthguard } from './localAuthGuard';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @UseGuards(LocalAuthguard)
    @Post('login')
    async login (@Request() req){
        return this.authService.login(req.user)
    }

}
