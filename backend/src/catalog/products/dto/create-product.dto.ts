export class VariantDto {
  size?: string;
  color?: string;
  stock!: number;
  sku?: string;
}


export class CreateProductDto {
  seller_id!: string;
  category_id!: string;
  title!: string;
  brand?: string;
  tags?: string[];
  description?: string;

  images?: string[];

  price!: {
    currency: string;
    amount: number;
    compare_at_amount?: number;
    discount_percent?: number;
  };

  variants?: VariantDto[];
}


