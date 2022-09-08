import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../users/users-repository.service';
import { BaseRepository } from '../../database/base.repository';

@Injectable()
export class SystemService {
  private tables: BaseRepository<any>[] = [new UsersRepositoryService()];

  async updateTablesIndexes() {
    return await Promise.allSettled(
      this.tables.map((table) => table.updateTableIndexes()),
    );
  }
}
