import { SetMetadata } from '@nestjs/common';
import { Roles } from '../common/enum/role.enum';

export const ROLES_KEY = 'role';
export const Role = (...roles: Array<Roles>) => SetMetadata(ROLES_KEY, roles);
