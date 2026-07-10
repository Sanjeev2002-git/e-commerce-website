"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    parent_category_id: { type: String, default: null, index: true },
    display_order: { type: Number, required: true, default: 0 },
    icon: { type: String, default: undefined },
    image_url: { type: String, default: undefined },
    attributes: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    featured: { type: Boolean, default: false, index: true },
    trending: { type: Boolean, default: false, index: true },
}, { timestamps: true });
CategorySchema.index({ parent_category_id: 1, display_order: 1 });
CategorySchema.index({ featured: 1, trending: 1 });
exports.CategoryModel = (0, mongoose_1.model)('Category', CategorySchema);
//# sourceMappingURL=category.schema.js.map