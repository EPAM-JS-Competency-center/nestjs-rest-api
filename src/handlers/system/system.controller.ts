import { Controller, Post } from '@nestjs/common';
import { ApiAuth } from '../../api-docs/api-docs.decorators';
import { ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller('/system')
export class SystemController {
  constructor(private systemService: SystemService) {}

  @ApiAuth()
  @Post('/update-tables-indexes')
  updateIndexes() {
    return this.systemService.updateTablesIndexes();
  }
}
