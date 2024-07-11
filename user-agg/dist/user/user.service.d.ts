import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class UserService {
    private readonly clientUser;
    constructor(clientUser: ClientProxy);
    create(createUserDto: any): Promise<any>;
    findAll(payload: any): Promise<any>;
    findOne(userId: string): Promise<any>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(userId: string): Promise<void>;
}
