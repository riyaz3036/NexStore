import { SortEnum } from '@/enums/sort.enum';
import { Product } from './product.types';

export interface Variant {
  id: string;
  product: Product;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  images: string[];
} 

export interface CreateVariantRequest {
  productId: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  images: string[];
}


export interface UpdateVariantRequest {
  name?: string;
  description?: string;
  price?: number;
  offerPrice?: number;
}

export interface VariantFilter {
  categoryIds?: string[];
  sort?: SortEnum;
  bestSeller?: boolean;
}