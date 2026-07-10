import { Schema, model } from 'mongoose';

export type ReviewDocument = {
  product_id: string;
  user_id: string; // UUID string from Postgres users.id
  rating: number;
  comment?: string;
  images: string[];
  verified_purchase: boolean;
  created_at?: Date;
  updated_at?: Date;
};

const ReviewSchema = new Schema<ReviewDocument>(
  {
    product_id: { type: String, required: true, index: true },
    user_id: { type: String, required: true, index: true },

    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    images: { type: [String], default: [] },

    verified_purchase: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

// Ensure one review per user per product (commonly desired)
ReviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

export const ReviewModel = model<ReviewDocument>('Review', ReviewSchema);

