import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export const AUTH_HEADER = 'x-api-key';
export const SECRET_AUTH_KEY = 'secret';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.get<boolean>(
      'skip-auth',
      context.getHandler(),
    );
    if (skipAuth) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const apiKeyHeaderValue = req.headers[AUTH_HEADER];
    if (!apiKeyHeaderValue) {
      throw new UnauthorizedException('Api key was not provided');
    }

    if (apiKeyHeaderValue !== SECRET_AUTH_KEY) {
      throw new UnauthorizedException("Api key doesn't match");
    }
    return true;
  }
}
