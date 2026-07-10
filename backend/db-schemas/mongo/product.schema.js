"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductVariantSchema = new mongoose_1.Schema({
    size: { type: String, default: undefined },
    color: { type: String, default: undefined },
    stock: { type: Number, required: true, min: 0 },
}, { _id: false });
const ProductSchema = new mongoose_1.Schema({
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
    category_attributes: { type: mongoose_1.Schema.Types.Mixed, default: {} },
}, {
    timestamps: true,
});
ProductSchema.index({ seller_id: 1, status: 1 });
ProductSchema.index({ category_id: 1, status: 1 });
ProductSchema.index({ title: 'text' });
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=product.schema.js.map