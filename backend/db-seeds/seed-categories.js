"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_schema_1 = require("../db-schemas/mongo/category.schema");
const TAXONOMY = [
    {
        name: 'Fashion',
        slug: 'fashion',
        parentSlug: null,
        display_order: 1,
        featured: true,
        trending: true,
        attributes: { vertical: 'fashion' },
        icon: '👗',
        image_url: 'https://example.com/icons/fashion.png',
    },
    {
        name: 'Men',
        slug: 'fashion-men',
        parentSlug: 'fashion',
        display_order: 1,
        featured: true,
        trending: false,
        icon: '🧥',
        attributes: { size: true, color: true, fabric: true, fit: true },
    },
    { name: 'Topwear', slug: 'fashion-men-topwear', parentSlug: 'fashion-men', display_order: 1, icon: '👕', attributes: { sleeve: true, fit: true, fabric: true } },
    { name: 'T-Shirts', slug: 'fashion-men-tshirts', parentSlug: 'fashion-men-topwear', display_order: 1, icon: '👕', attributes: { fit: true, fabric: true, neck: true } },
    { name: 'Shirts', slug: 'fashion-men-shirts', parentSlug: 'fashion-men-topwear', display_order: 2, icon: '👔', attributes: { collar: true, fabric: true, fit: true } },
    { name: 'Jackets', slug: 'fashion-men-jackets', parentSlug: 'fashion-men-topwear', display_order: 3, icon: '🧥', attributes: { insulation: true, fabric: true } },
    { name: 'Bottomwear', slug: 'fashion-men-bottomwear', parentSlug: 'fashion-men', display_order: 2, icon: '👖', attributes: { waist: true, length: true, fabric: true } },
    { name: 'Jeans', slug: 'fashion-men-jeans', parentSlug: 'fashion-men-bottomwear', display_order: 1, icon: '👖', attributes: { fit: true, wash: true } },
    { name: 'Trousers', slug: 'fashion-men-trousers', parentSlug: 'fashion-men-bottomwear', display_order: 2, icon: '🩳', attributes: { fit: true, fabric: true } },
    { name: 'Shorts', slug: 'fashion-men-shorts', parentSlug: 'fashion-men-bottomwear', display_order: 3, icon: '🩳', attributes: { length: true, fabric: true } },
    { name: 'Ethnic Wear', slug: 'fashion-men-ethnic-wear', parentSlug: 'fashion-men', display_order: 3, icon: '🪘', attributes: { fabric: true, work: true } },
    { name: 'Kurta Sets', slug: 'fashion-men-kurta-sets', parentSlug: 'fashion-men-ethnic-wear', display_order: 1, icon: '🧵', attributes: { embroidery: true, fabric: true } },
    { name: 'Kurtas', slug: 'fashion-men-kurtas', parentSlug: 'fashion-men-ethnic-wear', display_order: 2, icon: '🧥', attributes: { fabric: true, length: true } },
    { name: 'Women', slug: 'fashion-women', parentSlug: 'fashion', display_order: 2, featured: true, icon: '👚', attributes: { size: true, color: true, fabric: true, fit: true } },
    { name: 'Topwear', slug: 'fashion-women-topwear', parentSlug: 'fashion-women', display_order: 1, icon: '👚', attributes: { sleeve: true, fit: true, fabric: true } },
    { name: 'Sarees', slug: 'fashion-women-sarees', parentSlug: 'fashion-women-topwear', display_order: 1, icon: '🧣', attributes: { fabric: true, weave: true } },
    { name: 'Kurtis', slug: 'fashion-women-kurtis', parentSlug: 'fashion-women-topwear', display_order: 2, icon: '🧵', attributes: { fabric: true, embroidery: true } },
    { name: 'Dresses', slug: 'fashion-women-dresses', parentSlug: 'fashion-women-topwear', display_order: 3, icon: '👗', attributes: { occasion: true, fabric: true, sleeve: true } },
    { name: 'Bottomwear', slug: 'fashion-women-bottomwear', parentSlug: 'fashion-women', display_order: 2, icon: '👖', attributes: { waist: true, length: true, fabric: true } },
    { name: 'Leggings', slug: 'fashion-women-leggings', parentSlug: 'fashion-women-bottomwear', display_order: 1, icon: '🧷', attributes: { fabric: true, stretch: true } },
    { name: 'Jeans', slug: 'fashion-women-jeans', parentSlug: 'fashion-women-bottomwear', display_order: 2, icon: '👖', attributes: { fit: true, wash: true } },
    { name: 'Ethnic Wear', slug: 'fashion-women-ethnic-wear', parentSlug: 'fashion-women', display_order: 3, icon: '🪡', attributes: { work: true, fabric: true } },
    { name: 'Lehengas', slug: 'fashion-women-lehengas', parentSlug: 'fashion-women-ethnic-wear', display_order: 1, icon: '👗', attributes: { work: true, fabric: true } },
    { name: 'Kids', slug: 'fashion-kids', parentSlug: 'fashion', display_order: 3, featured: false, icon: '🧒', attributes: { size: true, comfort: true } },
    { name: 'Clothing', slug: 'fashion-kids-clothing', parentSlug: 'fashion-kids', display_order: 1, icon: '🧸', attributes: { size: true, fabric: true, comfort: true } },
    { name: 'T-Shirts', slug: 'fashion-kids-tshirts', parentSlug: 'fashion-kids-clothing', display_order: 1, icon: '👕', attributes: { fabric: true, age: true } },
    {
        name: 'Electronics',
        slug: 'electronics',
        parentSlug: null,
        display_order: 2,
        featured: true,
        trending: true,
        icon: '📱',
        image_url: 'https://example.com/icons/electronics.png',
        attributes: { vertical: 'electronics' },
    },
    { name: 'Mobiles & Accessories', slug: 'electronics-mobiles', parentSlug: 'electronics', display_order: 1, icon: '📱', attributes: { brand: true, storage: true, ram: true, warranty: true } },
    { name: 'Smartphones', slug: 'electronics-smartphones', parentSlug: 'electronics-mobiles', display_order: 1, icon: '📱', attributes: { ram: true, storage: true, warranty: true, os: true } },
    { name: 'Phone Covers', slug: 'electronics-covers', parentSlug: 'electronics-mobiles', display_order: 2, icon: '🛡️', attributes: { material: true, type: true } },
    {
        name: 'Jewelry & Watches',
        slug: 'jewelry-watches',
        parentSlug: null,
        display_order: 12,
        featured: true,
        trending: true,
        icon: '💍',
        image_url: 'https://example.com/icons/jewelry.png',
        attributes: { vertical: 'jewelry' },
    },
    { name: 'Watches', slug: 'jewelry-watches-watches', parentSlug: 'jewelry-watches', display_order: 1, icon: '⌚️', attributes: { dial_size: true, strap_material: true, warranty: true } },
    { name: 'Smart Watches', slug: 'jewelry-watches-smart-watches', parentSlug: 'jewelry-watches-watches', display_order: 1, icon: '⌚️', attributes: { sensor: true, battery_hours: true, warranty: true } },
];
async function runSeed() {
    const existingBySlug = await category_schema_1.CategoryModel.find({ slug: { $in: TAXONOMY.map((c) => c.slug) } }).lean();
    const idBySlug = {};
    for (const doc of existingBySlug)
        idBySlug[doc.slug] = String(doc._id);
    for (const cat of TAXONOMY) {
        if (idBySlug[cat.slug])
            continue;
        const parentId = cat.parentSlug ? idBySlug[cat.parentSlug] ?? null : null;
        const inserted = await category_schema_1.CategoryModel.create({
            name: cat.name,
            slug: cat.slug,
            parent_category_id: parentId,
            display_order: cat.display_order,
            icon: cat.icon,
            image_url: cat.image_url,
            attributes: cat.attributes ?? {},
            featured: !!cat.featured,
            trending: !!cat.trending,
        });
        idBySlug[cat.slug] = String(inserted._id);
        console.log(`Seeded: ${cat.slug}`);
    }
    console.log('Category seeding complete');
}
runSeed().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed-categories.js.map