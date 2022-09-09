import { ApiHeader } from '@nestjs/swagger';
import { AUTH_HEADER } from '../guards/api-key-auth.guard';

export function ApiAuth() {
  return ApiHeader({
    name: AUTH_HEADER,
    description: 'Provide auth key',
    required: true,
  });
}
