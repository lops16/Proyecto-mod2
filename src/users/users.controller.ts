import { Body, Controller, Get, Param, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';
import { PinturasService } from 'src/pinturas/pinturas.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService){}
    @Get("/:name")
    findByUsername(@Param("name") name: string):any{
        return this.usersServices.findByUsername(name)
    }

    @Put("/:name/addPaint")
    @UseGuards(JwtAuthGuard)
    updateByUsername(@Body("paint") body:string, @Param("name") name:string ):any{
        console.log(body);
        console.log(name);
        return this.usersServices.updateByUsername(name, body) 
    }
    @Put("/:name/removePaint")
    deletedFavPaint(@Body("paint") body:string, @Param("name") name:string ):any{
        console.log(body);
        console.log(name);
        return this.usersServices.deletedFavPaint(name, body) 
    }
    
}
