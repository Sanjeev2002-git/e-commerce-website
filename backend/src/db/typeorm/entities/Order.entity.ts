import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';
import { Seller } from './Seller.entity';
import { OrderItem } from './OrderItem.entity';
import { Payment } from './Payment.entity';
import { OrderStatus } from '../enums';

@Entity({ name: 'orders' })
@Index(['userId'])
@Index(['sellerId'])
@Index(['status'])
@Index(['sellerId', 'status'])
@Index(['userId', 'status'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;


  @ManyToOne(() => User, (u) => u.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user!: User;


  @Column({ name: 'seller_id', type: 'uuid' })
  sellerId!: string;


  @ManyToOne(() => Seller, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'seller_id' })
  seller!: Seller;


  @Column({ name: 'status', type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status!: OrderStatus;


  @Column({ name: 'shipping_line1', type: 'text' })
  shippingLine1!: string;


  @Column({ name: 'shipping_line2', type: 'text', nullable: true })
  shippingLine2?: string | null;

  @Column({ name: 'shipping_city', type: 'text' })
  shippingCity!: string;


  @Column({ name: 'shipping_state', type: 'text', nullable: true })
  shippingState?: string | null;

  @Column({ name: 'shipping_postal_code', type: 'text' })
  shippingPostalCode!: string;


  @Column({ name: 'shipping_country', type: 'text' })
  shippingCountry!: string;


  @Column({ name: 'shipping_full_name', type: 'text' })
  shippingFullName!: string;


  @Column({ name: 'shipping_phone', type: 'text', nullable: true })
  shippingPhone?: string | null;

  @Column({ name: 'payment_id', type: 'uuid', nullable: true })
  paymentId?: string | null;

  @OneToOne(() => Payment, (p) => p.order, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'payment_id' })
  payment!: Payment;


  @Column({ name: 'coupon_code', type: 'text', nullable: true })
  couponCode?: string | null;

  @Column({ name: 'coupon_discount_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  couponDiscountAmount!: string;


  @Column({ name: 'subtotal_amount', type: 'numeric', precision: 12, scale: 2 })
  subtotalAmount!: string;


  @Column({ name: 'shipping_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  shippingAmount!: string;


  @Column({ name: 'tax_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  taxAmount!: string;


  @Column({ name: 'total_amount', type: 'numeric', precision: 12, scale: 2 })
  totalAmount!: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;


  @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
  confirmedAt?: Date | null;

  @Column({ name: 'packed_at', type: 'timestamptz', nullable: true })
  packedAt?: Date | null;

  @Column({ name: 'shipped_at', type: 'timestamptz', nullable: true })
  shippedAt?: Date | null;

  @Column({ name: 'out_for_delivery_at', type: 'timestamptz', nullable: true })
  outForDeliveryAt?: Date | null;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt?: Date | null;

  @Column({ name: 'cancelled_at', type: 'timestamptz', nullable: true })
  cancelledAt?: Date | null;

  @Column({ name: 'return_requested_at', type: 'timestamptz', nullable: true })
  returnRequestedAt?: Date | null;

  @Column({ name: 'refunded_at', type: 'timestamptz', nullable: true })
  refundedAt?: Date | null;

  @OneToMany(() => OrderItem, (i) => i.order, { cascade: true })
  items!: OrderItem[];

}

