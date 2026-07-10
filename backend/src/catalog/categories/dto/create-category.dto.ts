export class CreateCategoryDto {
  name!: string;
  slug!: string;
  parent_category_id?: string | null;
  display_order?: number;
  icon?: string;
  image_url?: string;
  attributes?: Record<string, any>;
  featured?: boolean;
  trending?: boolean;
}


