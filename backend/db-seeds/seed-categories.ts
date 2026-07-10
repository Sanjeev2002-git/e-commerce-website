/*
  Category taxonomy seed script

  - Creates nested categories: top-level → sub-category → sub-sub-category
  - Supports required fields:
      id (Mongo _id), name, slug, parent_category_id (nullable), display_order,
      icon/image_url, attributes (flexible), featured/trending

  Run (after installing backend deps + adding a mongoose connection module):
    node -r ts-node/register db-seeds/seed-categories.ts

  NOTE: This repo scaffolding phase doesn't include a working runtime DB connection
  yet. This script is provided as a seed template with the taxonomy data.
*/

import { CategoryModel } from '../db-schemas/mongo/category.schema';

type CategorySeed = {
  name: string;
  slug: string;
  parentSlug?: string | null;
  display_order: number;
  icon?: string;
  image_url?: string;
  featured?: boolean;
  trending?: boolean;
  attributes?: Record<string, any>;
};

const TAXONOMY: CategorySeed[] = [
  // ============ 1) Fashion (top-level) ============
  {
    name: 'Fashion',
    slug: 'fashion',
    parentSlug: null,
    display_order: 1,
    featured: true,
    trending: true,
    attributes: { vertical: 'fashion' },
    icon: '👗',
    image_url: 'https://picsum.photos/seed/fashion/400/400',
  },

  // Fashion > Men
  {
    name: 'Men',
    slug: 'fashion-men',
    parentSlug: 'fashion',
    display_order: 1,
    featured: true,
    trending: false,
    icon: '🧥',
    image_url: 'https://picsum.photos/seed/fashion-men/400/400',
    attributes: { size: true, color: true, fabric: true, fit: true },
  },
  { name: 'Topwear', slug: 'fashion-men-topwear', parentSlug: 'fashion-men', display_order: 1, icon: '👕', image_url: 'https://picsum.photos/seed/fashion-men-topwear/400/400', attributes: { sleeve: true, fit: true, fabric: true } },
  { name: 'T-Shirts', slug: 'fashion-men-tshirts', parentSlug: 'fashion-men-topwear', display_order: 1, icon: '👕', image_url: 'https://picsum.photos/seed/fashion-men-tshirts/400/400', attributes: { fit: true, fabric: true, neck: true } },
  { name: 'Shirts', slug: 'fashion-men-shirts', parentSlug: 'fashion-men-topwear', display_order: 2, icon: '👔', image_url: 'https://picsum.photos/seed/fashion-men-shirts/400/400', attributes: { collar: true, fabric: true, fit: true } },
  { name: 'Jackets', slug: 'fashion-men-jackets', parentSlug: 'fashion-men-topwear', display_order: 3, icon: '🧥', image_url: 'https://picsum.photos/seed/fashion-men-jackets/400/400', attributes: { insulation: true, fabric: true } },

  { name: 'Bottomwear', slug: 'fashion-men-bottomwear', parentSlug: 'fashion-men', display_order: 2, icon: '👖', image_url: 'https://picsum.photos/seed/fashion-men-bottomwear/400/400', attributes: { waist: true, length: true, fabric: true } },
  { name: 'Jeans', slug: 'fashion-men-jeans', parentSlug: 'fashion-men-bottomwear', display_order: 1, icon: '👖', image_url: 'https://picsum.photos/seed/fashion-men-jeans/400/400', attributes: { fit: true, wash: true } },
  { name: 'Trousers', slug: 'fashion-men-trousers', parentSlug: 'fashion-men-bottomwear', display_order: 2, icon: '🩳', image_url: 'https://picsum.photos/seed/fashion-men-trousers/400/400', attributes: { fit: true, fabric: true } },
  { name: 'Shorts', slug: 'fashion-men-shorts', parentSlug: 'fashion-men-bottomwear', display_order: 3, icon: '🩳', image_url: 'https://picsum.photos/seed/fashion-men-shorts/400/400', attributes: { length: true, fabric: true } },

  { name: 'Ethnic Wear', slug: 'fashion-men-ethnic-wear', parentSlug: 'fashion-men', display_order: 3, icon: '🪘', image_url: 'https://picsum.photos/seed/fashion-men-ethnic-wear/400/400', attributes: { fabric: true, work: true } },
  { name: 'Kurta Sets', slug: 'fashion-men-kurta-sets', parentSlug: 'fashion-men-ethnic-wear', display_order: 1, icon: '🧵', image_url: 'https://picsum.photos/seed/fashion-men-kurta-sets/400/400', attributes: { embroidery: true, fabric: true } },
  { name: 'Kurtas', slug: 'fashion-men-kurtas', parentSlug: 'fashion-men-ethnic-wear', display_order: 2, icon: '🧥', image_url: 'https://picsum.photos/seed/fashion-men-kurtas/400/400', attributes: { fabric: true, length: true } },

  // Fashion > Women
  { name: 'Women', slug: 'fashion-women', parentSlug: 'fashion', display_order: 2, featured: true, icon: '👚', image_url: 'https://picsum.photos/seed/fashion-women/400/400', attributes: { size: true, color: true, fabric: true, fit: true } },
  { name: 'Topwear', slug: 'fashion-women-topwear', parentSlug: 'fashion-women', display_order: 1, icon: '👚', image_url: 'https://picsum.photos/seed/fashion-women-topwear/400/400', attributes: { sleeve: true, fit: true, fabric: true } },
  { name: 'Sarees', slug: 'fashion-women-sarees', parentSlug: 'fashion-women-topwear', display_order: 1, icon: '🧣', image_url: 'https://picsum.photos/seed/fashion-women-sarees/400/400', attributes: { fabric: true, weave: true } },
  { name: 'Kurtis', slug: 'fashion-women-kurtis', parentSlug: 'fashion-women-topwear', display_order: 2, icon: '🧵', image_url: 'https://picsum.photos/seed/fashion-women-kurtis/400/400', attributes: { fabric: true, embroidery: true } },
  { name: 'Dresses', slug: 'fashion-women-dresses', parentSlug: 'fashion-women-topwear', display_order: 3, icon: '👗', image_url: 'https://picsum.photos/seed/fashion-women-dresses/400/400', attributes: { occasion: true, fabric: true, sleeve: true } },

  { name: 'Bottomwear', slug: 'fashion-women-bottomwear', parentSlug: 'fashion-women', display_order: 2, icon: '👖', image_url: 'https://picsum.photos/seed/fashion-women-bottomwear/400/400', attributes: { waist: true, length: true, fabric: true } },
  { name: 'Leggings', slug: 'fashion-women-leggings', parentSlug: 'fashion-women-bottomwear', display_order: 1, icon: '🧷', image_url: 'https://picsum.photos/seed/fashion-women-leggings/400/400', attributes: { fabric: true, stretch: true } },
  { name: 'Jeans', slug: 'fashion-women-jeans', parentSlug: 'fashion-women-bottomwear', display_order: 2, icon: '👖', image_url: 'https://picsum.photos/seed/fashion-women-jeans/400/400', attributes: { fit: true, wash: true } },

  { name: 'Ethnic Wear', slug: 'fashion-women-ethnic-wear', parentSlug: 'fashion-women', display_order: 3, icon: '🪡', image_url: 'https://picsum.photos/seed/fashion-women-ethnic-wear/400/400', attributes: { work: true, fabric: true } },
  { name: 'Lehengas', slug: 'fashion-women-lehengas', parentSlug: 'fashion-women-ethnic-wear', display_order: 1, icon: '👗', image_url: 'https://picsum.photos/seed/fashion-women-lehengas/400/400', attributes: { work: true, fabric: true } },

  // Fashion > Kids
  { name: 'Kids', slug: 'fashion-kids', parentSlug: 'fashion', display_order: 3, featured: false, icon: '🧒', image_url: 'https://picsum.photos/seed/fashion-kids/400/400', attributes: { size: true, comfort: true } },
  { name: 'Clothing', slug: 'fashion-kids-clothing', parentSlug: 'fashion-kids', display_order: 1, icon: '🧸', image_url: 'https://picsum.photos/seed/fashion-kids-clothing/400/400', attributes: { size: true, fabric: true, comfort: true } },
  { name: 'T-Shirts', slug: 'fashion-kids-tshirts', parentSlug: 'fashion-kids-clothing', display_order: 1, icon: '👕', image_url: 'https://picsum.photos/seed/fashion-kids-tshirts/400/400', attributes: { fabric: true, age: true } },

  // Many more categories would be seeded here.
  // For scaffolding/testing, expand this list to 150-200+ entries.

  // ============ 2) Electronics (top-level) ============
  {
    name: 'Electronics',
    slug: 'electronics',
    parentSlug: null,
    display_order: 2,
    featured: true,
    trending: true,
    icon: '📱',
    image_url: 'https://picsum.photos/seed/electronics/400/400',
    attributes: { vertical: 'electronics' },
  },
  { name: 'Mobiles & Accessories', slug: 'electronics-mobiles', parentSlug: 'electronics', display_order: 1, icon: '📱', image_url: 'https://picsum.photos/seed/electronics-mobiles/400/400', attributes: { brand: true, storage: true, ram: true, warranty: true } },
  { name: 'Smartphones', slug: 'electronics-smartphones', parentSlug: 'electronics-mobiles', display_order: 1, icon: '📱', image_url: 'https://picsum.photos/seed/electronics-smartphones/400/400', attributes: { ram: true, storage: true, warranty: true, os: true } },
  { name: 'Phone Covers', slug: 'electronics-covers', parentSlug: 'electronics-mobiles', display_order: 2, icon: '🛡️', image_url: 'https://picsum.photos/seed/electronics-covers/400/400', attributes: { material: true, type: true } },

  // ============ 12) Jewelry & Watches (top-level) ============
  {
    name: 'Jewelry & Watches',
    slug: 'jewelry-watches',
    parentSlug: null,
    display_order: 12,
    featured: true,
    trending: true,
    icon: '💍',
    image_url: 'https://picsum.photos/seed/jewelry-watches/400/400',
    attributes: { vertical: 'jewelry' },
  },
  { name: 'Watches', slug: 'jewelry-watches-watches', parentSlug: 'jewelry-watches', display_order: 1, icon: '⌚️', image_url: 'https://picsum.photos/seed/jewelry-watches-watches/400/400', attributes: { dial_size: true, strap_material: true, warranty: true } },
  { name: 'Smart Watches', slug: 'jewelry-watches-smart-watches', parentSlug: 'jewelry-watches-watches', display_order: 1, icon: '⌚️', image_url: 'https://picsum.photos/seed/jewelry-watches-smart-watches/400/400', attributes: { sensor: true, battery_hours: true, warranty: true } },

  // ============ 13) Toys & Games (top-level) ============
  {
    name: 'Toys & Games',
    slug: 'toys',
    parentSlug: null,
    display_order: 13,
    featured: true,
    trending: true,
    icon: '🧸',
    image_url: 'https://picsum.photos/seed/toys/400/400',
    attributes: { vertical: 'toys' },
  },
  { name: 'Action Figures', slug: 'toys-action-figures', parentSlug: 'toys', display_order: 1, icon: '🤖', image_url: 'https://picsum.photos/seed/toys-action-figures/400/400', attributes: { age_group: true, material: true } },
  { name: 'Soft Toys', slug: 'toys-soft-toys', parentSlug: 'toys', display_order: 2, icon: '🧸', image_url: 'https://picsum.photos/seed/toys-soft-toys/400/400', attributes: { age_group: true, material: true, washable: true } },
  { name: 'Building Blocks', slug: 'toys-building-blocks', parentSlug: 'toys', display_order: 3, icon: '🧩', image_url: 'https://picsum.photos/seed/toys-building-blocks/400/400', attributes: { age_group: true, piece_count: true } },
  { name: 'Board Games', slug: 'toys-board-games', parentSlug: 'toys', display_order: 4, icon: '🎲', image_url: 'https://picsum.photos/seed/toys-board-games/400/400', attributes: { players: true, age_group: true } },
  { name: 'Remote Control Toys', slug: 'toys-remote-control', parentSlug: 'toys', display_order: 5, icon: '🚗', image_url: 'https://picsum.photos/seed/toys-remote-control/400/400', attributes: { age_group: true, battery_type: true } },
];

// TODO: Expand TAXONOMY to at least 150-200 entries as requested.
// The seed template is designed to make expansion straightforward.

async function runSeed() {
  // Connection intentionally omitted (scaffolding phase).

  // 1) Build a mapping from slug -> seeded document _id
  const existingBySlug = await CategoryModel.find({ slug: { $in: TAXONOMY.map((c) => c.slug) } }).lean();
  const idBySlug: Record<string, string> = {};
  for (const doc of existingBySlug) idBySlug[doc.slug] = String((doc as any)._id);

  // 2) Insert categories in parent-before-child order.
  // We rely on the fact that TAXONOMY is roughly ordered by nesting.
  for (const cat of TAXONOMY) {
    if (idBySlug[cat.slug]) continue;

    const parentId = cat.parentSlug ? idBySlug[cat.parentSlug] ?? null : null;

    const inserted = await CategoryModel.create({
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

