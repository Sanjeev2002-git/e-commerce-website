import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';

@Entity({ name: 'user_addresses' })
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;


  @ManyToOne(() => User, (u) => u.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;


  @Column({ type: 'text', nullable: true })
  label?: string | null;

  @Column({ name: 'full_name', type: 'text' })
  fullName!: string;


  @Column({ type: 'text', nullable: true })
  phone?: string | null;

  @Column({ type: 'text' })
  line1!: string;



  @Column({ type: 'text', nullable: true })
  line2?: string | null;

  @Column({ type: 'text' })
  city!: string;



  @Column({ type: 'text', nullable: true })
  state?: string | null;

  @Column({ name: 'postal_code', type: 'text' })
  postalCode!: string;



  @Column({ type: 'text' })
  country!: string;



  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault!: boolean;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;


}

