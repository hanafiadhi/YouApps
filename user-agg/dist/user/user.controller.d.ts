import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createv2(createUserDto: CreateUserDto): Promise<any>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(response: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
