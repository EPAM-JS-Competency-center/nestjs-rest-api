import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from '../carts/carts.entity';
import { DbDateValues } from '../../shared/constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => DbDateValues.CURRENT_TIMESTAMP })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => DbDateValues.CURRENT_TIMESTAMP })
  updatedAt: string;

  @OneToMany(() => Cart, (cart: Cart) => cart.user)
  carts: Cart[];
}
