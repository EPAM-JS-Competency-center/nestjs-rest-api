import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  ManyToOne,
} from 'typeorm';
import { Currency } from './constants';
import { User } from '../users/users.entity';

const BALANCE_FIELD = 'balance';

@Entity()
@Check(`"${BALANCE_FIELD}" > 0`)
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Currency, type: 'enum' })
  currency: Currency;

  @Column({})
  [BALANCE_FIELD]: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.carts)
  user: User;
}
