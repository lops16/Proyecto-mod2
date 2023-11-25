import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(username: string): Promise<User> {

    return await this.userModel.findOne({ username: username });
    } 

    async createUser(username: string, password: string): Promise<User> {
        const newUser = new this.userModel({ username, password });
        return await newUser.save();
    }
}
