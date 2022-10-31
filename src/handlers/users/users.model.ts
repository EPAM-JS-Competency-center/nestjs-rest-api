import { BaseModel } from '../../shared/base-model/base-model.model';
import { getUserPrimaryKey } from './utils/user-primary-key.utils';
import { Cart } from '../carts/carts.model';

export type UserKey = {
  userId: string;
  relationKey: string;
};

/** It's supposed to add all user relations here using & operator */
type UserRelations = { createdAt?: string } & Cart;

export interface ProtectedUser extends UserKey, UserRelations {
  name: string;
  email: string;
}

export type User = Partial<ProtectedUser>;

export class UserModel extends BaseModel<User> {
  get id() {
    return getUserPrimaryKey(this.entity.userId, this.entity.relationKey);
  }
}
