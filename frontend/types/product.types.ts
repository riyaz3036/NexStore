import { Category } from './category.types';
import { Variant } from './variant.types';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  isBestSeller: boolean;
} 

export interface ExpandedProduct {
  id: string;
  name: string;
  description: string;
  category: Category;
  isBestSeller: boolean;
  variants: Variant[],
  relatedVariants: Variant[]
} 

export interface CreateProductRequest {
  name: string;
  description: string;
  categoryId: string;
  isBestSeller: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  categoryId?: string;
  isBestSeller?: boolean;
}