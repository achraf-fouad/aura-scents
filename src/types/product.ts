export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  images: string[] | null;
  description: string | null;
  category: string;
  intensity: string | null;
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  top_notes?: string[] | null;
  heart_notes?: string[] | null;
  base_notes?: string[] | null;
  size?: string;
  volume?: string | null;
  isNew?: boolean;
  isBestSeller?: boolean;
  is_new?: boolean | null;
  is_bestseller?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt?: Date;
}
