import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!roles || roles.length === 0) return true;

    // Scaffolding only: assume authenticated user exists.
    const req = context.switchToHttp().getRequest();
    const userRoles: string[] = req?.user?.roles ?? [];

    return roles.some((r) => userRoles.includes(r));
  }
}

