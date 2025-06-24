import { User } from './user.types';
import { Variant } from './variant.types';

export interface Favorite {
  id: string;
  user: User;
  variant: Variant;
} 

export interface CreateFavoriteRequest {
  userId: string;
  variantId: string;
} 