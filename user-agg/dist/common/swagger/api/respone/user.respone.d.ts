import { CreateUserDto } from '../../../../user/dto/create-user.dto';
declare const UserResSuccesCreate_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UserResSuccesCreate extends UserResSuccesCreate_base {
    _id: string;
    username: string;
    password?: string;
    role: string[];
    applications: string[];
}
export {};
