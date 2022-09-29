import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  getAppConfig () {
    return {
      env: 'development',
    };
  }
}
