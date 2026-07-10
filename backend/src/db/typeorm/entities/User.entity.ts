import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { UserAddress } from './UserAddress.entity';
import { Order } from './Order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ type: 'text', nullable: false })
  name!: string;


  @Index({ unique: true })
  @Column({ type: 'text', nullable: false, unique: true })
  email!: string;


  @Column({ type: 'text', nullable: true })
  phone?: string | null;


  @Column({ name: 'password_hash', type: 'text', nullable: false })
  passwordHash!: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;


  @OneToMany(() => UserAddress, (a) => a.user, { cascade: true })
  addresses!: UserAddress[];


  @OneToMany(() => Order, (o) => o.user)
  orders!: Order[];

}

