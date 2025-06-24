export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  image?: string;
} 

export interface UpdateUserRequest {
  username?: string;
  phone?: string;
}