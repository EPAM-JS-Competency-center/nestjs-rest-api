import { Controller, Get } from '@nestjs/common';

import { SkipAuth } from './guards/skip-auth.decorator';

@Controller('')
export class AppController {

  @SkipAuth()
  @Get('health')
  healthCheck(): any {
    return {
      message: 'OK',
      time: new Date(),
    };
  }
}
