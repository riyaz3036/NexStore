import { User } from './user.types';
import { Variant } from './variant.types';

export interface Cart {
  id: string;
  user: User;
  variant: Variant;
  quantity: number;
} 

export interface CreateCartRequest {
  userId: string;
  variantId: string;
  quantity: number;
} 

export interface UpdateCartRequest {
  id: string;
  quantity: number;
}