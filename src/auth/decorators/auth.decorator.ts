import { TypesRol } from 'src/common/glob/types';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, UseGuards } from '@nestjs/common';


export function Auth(...roles: TypesRol[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}