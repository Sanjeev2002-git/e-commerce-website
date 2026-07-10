import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './Order.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string;


  @ManyToOne(() => Order, (o) => o.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;


  @Column({ name: 'product_id', type: 'text' })
  productId!: string;


  @Column({ name: 'variant_id', type: 'text', nullable: true })
  variantId?: string | null;

  @Column({ name: 'title', type: 'text' })
  title!: string;


  @Column({ name: 'variant_title', type: 'text', nullable: true })
  variantTitle?: string | null;

  @Column({ name: 'qty', type: 'integer' })
  qty!: number;


  @Column({ name: 'unit_price', type: 'numeric', precision: 12, scale: 2 })
  unitPrice!: string;


  @Column({ name: 'unit_discount_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  unitDiscountAmount!: string;


  @Column({ name: 'line_amount', type: 'numeric', precision: 12, scale: 2 })
  lineAmount!: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

}

