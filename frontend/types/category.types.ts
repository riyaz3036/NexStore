export interface Category {
  id: string;
  description: string;
  image: string;
} 

export interface CreateCategoryRequest {
  description: string;
}

export interface UpdateCategoryRequest {
  description?: string;
}
