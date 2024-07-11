import { Roles } from '../common/enum/role.enum';
export declare const ROLES_KEY = "role";
export declare const Role: (...roles: Array<Roles>) => import("@nestjs/common").CustomDecorator<string>;
