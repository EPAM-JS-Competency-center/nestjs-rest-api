import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    this.logger.log(`Current env: ${this.getAppConfig().env}`);
  }

  getAppConfig() {
    return {
      env: 'development',
    };
  }
}
