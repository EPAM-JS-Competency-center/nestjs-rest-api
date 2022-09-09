import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from '../carts/carts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  phoneNumber: string;

  @Column({ default: new Date() })
  updatedAt: Date;

  @OneToMany(() => Cart, (cart: Cart) => cart.user)
  carts: Cart[];
}
