import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'sellers' })
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'business_name', type: 'text' })
  businessName!: string;


  @Index()
  @Column({ name: 'gst_number', type: 'text', nullable: true })
  gstNumber?: string | null;

  @Index()
  @Column({ name: 'pan', type: 'text', nullable: true })
  pan?: string | null;

  @Column({ name: 'bank_account_name', type: 'text', nullable: true })
  bankAccountName?: string | null;

  @Column({ name: 'bank_account_number', type: 'text', nullable: true })
  bankAccountNumber?: string | null;

  @Column({ name: 'bank_ifsc', type: 'text', nullable: true })
  bankIfsc?: string | null;

  @Column({ name: 'bank_name', type: 'text', nullable: true })
  bankName?: string | null;

  @Column({ name: 'kyc_status', type: 'text', default: 'pending' })
  kycStatus!: string;


  @Column({ name: 'commission_rate', type: 'numeric', precision: 6, scale: 4, default: 0 })
  commissionRate!: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;


  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

}

