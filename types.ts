export interface Product {
  id: string;
  store: Store; // Store reference
  category: Category; // Category reference
  name: string;
  price: string; // Consider changing to number if price is numeric
  quantity: number; // Changed to number for consistency
  rating: number; // Added based on the Product model
  description: string;
  isArchived: boolean; // Boolean to indicate if archived
  createdAt: Date; // ISO string format date
  updatedAt: Date; // ISO string format date
  images: Image[];
}

export interface Store {
  id: string;
  name: string;
  user: User; // User reference
  description?: string;
  latitude?: number; // Nullable fields for latitude
  longitude?: number; // Nullable fields for longitude
  paybill?: string; // Paybill can be null or blank
  createdAt: Date; // ISO string format date
  updatedAt: Date; // ISO string format date
  images: Image[];
  products: Product[];
  categories: Category[];
  counties: County[];
}

export interface Image {
  id: string;
  product?: Product; // Nullable Product reference
  store?: Store; // Nullable Store reference
  url: string;
  createdAt: string; // ISO string format date
  updatedAt: string; // ISO string format date
}

export interface Customer {
  id: string;
  store: Store; // Store reference
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  phoneNumber?: string;
}

export interface Order {
  id: string;
  store: Store; // Store reference
  customer: Customer; // Customer reference
  isPaid: boolean;
  isDelivered: boolean;
  phone: string;
  address: string;
  county: County; // County reference
  createdAt: Date; // ISO string format date
  updatedAt: Date; // ISO string format date
  deliveryDate: Date; // ISO string format date
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  order?: Order; // Order reference
  product: Product; // Product reference
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string; // Nullable image URL
  phoneNumber?: string;
  session_token?: string; // Nullable phone number
}

export interface UserProfile {
  id?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}

export interface Category {
  id: string;
  store: Store; // Store reference
  name: string;
  imageUrl: string;
  description?: string;
  createdAt: Date; // ISO string format date
  updatedAt: Date; // ISO string format date
}

export interface County {
  id: string;
  store: Store; // Store reference
  name: string;
  description?: string;
  createdAt: Date; // ISO string format date
  updatedAt: Date; // ISO string format date
}
