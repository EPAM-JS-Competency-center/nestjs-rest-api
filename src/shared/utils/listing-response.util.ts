interface Options<InputEntity, OutputEntity> {
  itemMap?: (item: InputEntity) => OutputEntity;
}

export class ListingResponse<InputEntity, OutputEntity = any> {
  private readonly items: InputEntity[];
  private readonly count: number;
  private readonly itemMap: Options<InputEntity, OutputEntity>['itemMap'];

  constructor(
    items: InputEntity[],
    count: number,
    options?: Options<InputEntity, OutputEntity>,
  ) {
    this.items = [...items];
    this.count = count;
    this.itemMap = options?.itemMap;
  }

  toJSON() {
    return {
      items: this.itemMap ? this.items.map(this.itemMap) : [...this.items],
      count: this.count,
    };
  }
}
