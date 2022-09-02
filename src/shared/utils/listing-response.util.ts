import { ResponseEntity } from '../types/types';

export interface ListingResponseOptions<Entity, OutputEntity = unknown> {
  itemMapper?: (item: Entity) => OutputEntity;
  lastReadItemId?: string;
}

export class ListingResponse<Entity, OutputEntity = unknown>
  implements ResponseEntity
{
  private readonly items: Entity[];
  private readonly total: number;
  private readonly itemMapper: ListingResponseOptions<
    Entity,
    OutputEntity
  >['itemMapper'];
  private readonly lastReadItemId: ListingResponseOptions<
    Entity,
    OutputEntity
  >['lastReadItemId'];

  constructor(
    items: Entity[],
    total: number,
    options?: ListingResponseOptions<Entity, OutputEntity>,
  ) {
    this.items = items;
    this.total = total;
    this.itemMapper = options?.itemMapper;
    this.lastReadItemId = options?.lastReadItemId;
  }

  private mapItems() {
    if (this.itemMapper) {
      return this.items.map(this.itemMapper);
    }

    return [...this.items];
  }

  getJSON() {
    return {
      items: this.mapItems(),
      total: this.total,
      lastReadItemId: this.lastReadItemId || null,
    };
  }
}
