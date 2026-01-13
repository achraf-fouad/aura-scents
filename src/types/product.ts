export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  category: 'femme' | 'homme' | 'unisexe';
  intensity: 'légère' | 'modérée' | 'intense';
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  size: string;
  isNew?: boolean;
  isBestSeller?: boolean;
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
