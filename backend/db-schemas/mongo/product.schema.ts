import { Schema, model } from 'mongoose';

// MongoDB Catalog (Mongoose models)
//
// Normalized approach:
// - Products + Categories + Reviews are in MongoDB.
// - Relational IDs in PostgreSQL:
//   - seller_id is stored as UUID string (from sellers.id)
//
// Updated from Step 1:
// - Category-specific attributes are stored flexibly in `category_attributes`
//   - keyed off category_id (or category slug) at the application layer.

export type ProductVariant = {
  size?: string;
  color?: string;
  stock: number;
};

export type ProductDocument = {
  seller_id: string; // UUID string from Postgres
  category_id: string;

  title: string;
  description?: string;
  brand?: string;

  images: string[];

  base_price: number;

  variants: ProductVariant[];

  status: 'active' | 'inactive' | 'archived';

  // Flexible, category-specific fields.
  // Example:
  // - Fashion: { size: 'M', fabric: 'Cotton', fit: 'Regular' }
  // - Electronics: { ram: '8GB', storage: '256GB', warranty_months: 12 }
  // - Grocery: { weight_g: 500, expiry_days: 30 }
  category_attributes?: Record<string, any>;

  created_at?: Date;
  updated_at?: Date;
};

const ProductVariantSchema = new Schema<ProductVariant>(
  {
    size: { type: String, default: undefined },
    color: { type: String, default: undefined },
    stock: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const ProductSchema = new Schema<ProductDocument>(
  {
    seller_id: { type: String, required: true, index: true },
    category_id: { type: String, required: true, index: true },

    title: { type: String, required: true, index: true },
    description: { type: String },
    brand: { type: String },

    images: { type: [String], default: [] },

    base_price: { type: Number, required: true, min: 0 },

    variants: { type: [ProductVariantSchema], default: [] },

    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
      index: true,
    },

    category_attributes: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  },
);

// Index strategy for catalog & browsing
ProductSchema.index({ seller_id: 1, status: 1 });
ProductSchema.index({ category_id: 1, status: 1 });
ProductSchema.index({ title: 'text' });

export const ProductModel = model<ProductDocument>('Product', ProductSchema);

