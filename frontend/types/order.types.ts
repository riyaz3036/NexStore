import { User } from './user.types';
import { Variant } from './variant.types';

export interface Order {
  id: string;
  createdAt: Date;
  user: User;
  variants: OrderVariant[];
  paymentMode: string;
  total: number;
  address: string;
}

export interface OrderVariant {
  id: string;
  variant: Variant;
  quantity: number;
} 

export interface CreateOrderRequest {
  userId: string;
  variants: CreateOrderVariantRequest[];
  paymentMode: string;
  address: string;
  total: number
}

export interface CreateOrderVariantRequest {
  variantId: string;
  quantity: number;
} 