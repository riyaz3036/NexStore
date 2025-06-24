export interface AuthResponse {
  id: string;
  username: string;
  email: string;
  token: string;
  phone?: string;
  image?: string;
} 

export interface LoginRequest {
  email: string;
  password: string
} 

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
} 

