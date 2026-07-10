import { Schema, model } from 'mongoose';

export type CategoryAttributes = Record<string, any>;

export type CategoryDocument = {
  name: string;
  slug: string;
  parent_category_id?: string | null;
  display_order: number;

  icon?: string;
  image_url?: string;

  // Category-specific attributes; schema is intentionally flexible.
  // Example keys (per category):
  // - Fashion: { size, color, fabric, fit }
  // - Electronics: { ram, storage, warranty }
  // - Grocery: { weight, expiry }
  attributes?: CategoryAttributes;

  // Homepage display
  featured?: boolean;
  trending?: boolean;

  created_at?: Date;
  updated_at?: Date;
};

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },

    parent_category_id: { type: String, default: null, index: true },

    display_order: { type: Number, required: true, default: 0 },

    icon: { type: String, default: undefined },
    image_url: { type: String, default: undefined },

    attributes: { type: Schema.Types.Mixed, default: {} },

    featured: { type: Boolean, default: false, index: true },
    trending: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

// Typical queries
CategorySchema.index({ parent_category_id: 1, display_order: 1 });
CategorySchema.index({ featured: 1, trending: 1 });

export const CategoryModel = model<CategoryDocument>('Category', CategorySchema);

