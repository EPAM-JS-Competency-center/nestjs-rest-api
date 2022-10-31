import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  ManyToOne,
} from 'typeorm';
import { Currency } from './constants';
import { User } from '../users/users.entity';
import { DbDateValues } from '../../shared/constants';

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

  @Column({ type: 'timestamp', default: () => DbDateValues.CURRENT_TIMESTAMP })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => DbDateValues.CURRENT_TIMESTAMP })
  updatedAt: string;

  @ManyToOne(() => User, (user: User) => user.carts)
  user: User;
}
