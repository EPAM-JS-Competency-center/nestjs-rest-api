import { ResponseEntity } from '../types/types';

export class BaseModel<Entity> implements ResponseEntity {
  entity: Partial<Entity>;

  constructor(entity: Partial<Entity>) {
    this.entity = entity;
  }

  /** It's supposed to be overridden */
  get id() {
    return null;
  }

  getJSON(ignoreFields?: string[]) {
    let result: Partial<Entity> = {};

    if (ignoreFields?.length) {
      Object.keys(this.entity).forEach((key) => {
        if (!ignoreFields.includes(key)) {
          result[key] = this.entity[key];
        }
      });
    } else {
      result = { ...this.entity };
    }

    return {
      ...result,
      itemId: this.id,
    };
  }
}
