import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CouponDiscountType } from '../enums';

@Entity({ name: 'coupons' })
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Index({ unique: true })
  @Column({ name: 'code', type: 'text', unique: true })
  code!: string;

  @Column({ name: 'discount_type', type: 'enum', enum: CouponDiscountType })
  discountType!: CouponDiscountType;

  @Column({ name: 'discount_value', type: 'numeric', precision: 12, scale: 4 })
  discountValue!: string;

  @Column({ name: 'min_order_value', type: 'numeric', precision: 12, scale: 2, default: 0 })
  minOrderValue!: string;

  @Column({ name: 'expiry', type: 'timestamptz', nullable: true })
  expiry?: Date | null;

  @Column({ name: 'usage_limit', type: 'integer' })
  usageLimit!: number;

  @Column({ name: 'usage_count', type: 'integer', default: 0 })
  usageCount!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

