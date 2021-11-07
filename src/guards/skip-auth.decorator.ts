import { SetMetadata } from '@nestjs/common';

export const SkipAuth = () => SetMetadata('skip-auth', true);
