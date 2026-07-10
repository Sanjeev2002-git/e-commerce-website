import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

// Public decorator support
export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [handler]);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req?.headers?.authorization ?? req?.headers?.Authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Malformed Authorization header');
    }

    const secret = process.env.JWT_ACCESS_TOKEN_SECRET ?? 'change_me';

    try {
      const payload = this.authService.verifyAccessToken(token, secret);
      // attach for RolesGuard
      req.user = {
        userId: payload.userId,
        roles: payload.roles ?? [],
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}


