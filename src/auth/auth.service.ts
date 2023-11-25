import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (private readonly userService: UsersService, private readonly jwtService: JwtService){}

    async validateUser(username:string,password:string): Promise<any>{
        let user = await this.userService.findOne(username)
        if (user && user.password === password) {
            const {password, ...result}= user
            return result
        
    }
    return null
    }   

    async register(username: string, password: string): Promise<any> {
        
        const existingUser = await this.userService.findOne(username);
        if (existingUser) {
        
        return { message: 'Username is already taken' };
        }

        const newUser = await this.userService.createUser(username, password);
    
        const { password: userPassword, ...result } = newUser;
        return result;
    }

    async login(user: any){
        const payload = {username: user.username, sub: user.userId}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
    

}
