"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    product_id: { type: String, required: true, index: true },
    user_id: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    images: { type: [String], default: [] },
    verified_purchase: { type: Boolean, default: false, index: true },
}, { timestamps: true });
ReviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });
exports.ReviewModel = (0, mongoose_1.model)('Review', ReviewSchema);
//# sourceMappingURL=review.schema.js.map