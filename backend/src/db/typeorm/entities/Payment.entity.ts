import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PaymentMethod, PaymentStatus } from '../enums';
import { Order } from './Order.entity';

@Entity({ name: 'payments' })
@Unique(['orderId'])
@Index(['orderId'])
@Index(['status'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string;


  @OneToOne(() => Order, (o) => o.payment)
  @JoinColumn({ name: 'order_id' })
  order!: Order;


  @Column({ name: 'method', type: 'enum', enum: PaymentMethod })
  method!: PaymentMethod;


  @Column({ name: 'status', type: 'enum', enum: PaymentStatus, default: PaymentStatus.Initiated })
  status!: PaymentStatus;


  @Column({ name: 'gateway_transaction_id', type: 'text', nullable: true })
  gatewayTransactionId?: string | null;

  @Column({ name: 'amount', type: 'numeric', precision: 12, scale: 2 })
  amount!: string;


  @Column({ name: 'currency', type: 'text', default: 'INR' })
  currency!: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;


  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;


  @Column({ name: 'succeeded_at', type: 'timestamptz', nullable: true })
  succeededAt?: Date | null;

  @Column({ name: 'failed_at', type: 'timestamptz', nullable: true })
  failedAt?: Date | null;
}

