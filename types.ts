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
  created_at: Date; // ISO string format date
  updated_at: Date; // ISO string format date
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
  created_at: Date; // ISO string format date
  updated_at: Date; // ISO string format date
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
  created_at: Date; // ISO string format date
  updated_at: Date; // ISO string format date
}

export interface Customer {
  id: string;
  store: Store; // Store reference
  first_name?: string;
  last_name?: string;
  email?: string;
  image?: string;
  phone_number?: string;
}

export interface Order {
  id: string;
  store: Store; // Store reference
  customer: Customer; // Customer reference
  is_paid: boolean;
  is_delivered: boolean;
  phone: string;
  address: string;
  created_at: Date; // ISO string format date
  updated_at: Date; // ISO string format date
  delivery_date: Date; // ISO string format date
  order_items: OrderItem[];
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
  created_at: Date; // ISO string format date
  updated_at: Date; // ISO string format date
}

export interface County {
  id: string;
  store: Store; // Store reference
  name: string;
  description?: string;
  created_at: Date; // ISO string format date
  updated_at: Date; // ISO string format date
}

//defaults
// Default User
export const defaultUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  phoneNumber: "",
  session_token: "",
};

// Default Image
export const defaultImage: Image = {
  id: "",
  url: "",
  created_at: new Date(),
  updated_at: new Date(),
};

// Default Category
export const defaultCategory: Category = {
  id: "",
  store: null as any, // Placeholder for Store reference
  name: "",
  imageUrl: "",
  description: "",
  created_at: new Date(),
  updated_at: new Date(),
};

// Default Product
export const defaultProduct: Product = {
  id: "",
  store: null as any, // Placeholder for Store reference
  category: defaultCategory,
  name: "",
  price: "0",
  quantity: 0,
  rating: 0,
  description: "",
  isArchived: false,
  created_at: new Date(),
  updated_at: new Date(),
  images: [defaultImage],
};

// Default Store
export const defaultStore: Store = {
  id: "",
  name: "",
  user: defaultUser,
  description: "",
  latitude: 0,
  longitude: 0,
  paybill: "",
  created_at: new Date(),
  updated_at: new Date(),
  images: [defaultImage],
  products: [defaultProduct],
  categories: [defaultCategory],
  counties: [],
};

// Default County
export const defaultCounty: County = {
  id: "",
  store: defaultStore,
  name: "",
  description: "",
  created_at: new Date(),
  updated_at: new Date(),
};

// Default Customer
export const defaultCustomer: Customer = {
  id: "",
  store: defaultStore,
  first_name: "",
  last_name: "",
  email: "",
  image: "",
  phone_number: "",
};

// Default OrderItem
export const defaultOrderItem: OrderItem = {
  id: "",
  order: null as any, // Placeholder for Order reference
  product: defaultProduct,
  quantity: 1,
  price: 0,
};

// Default Order
export const defaultOrder: Order = {
  id: "",
  store: defaultStore,
  customer: defaultCustomer,
  is_paid: false,
  is_delivered: false,
  phone: "",
  address: "",
  created_at: new Date(),
  updated_at: new Date(),
  delivery_date: new Date(),
  order_items: [defaultOrderItem],
};

// Default UserProfile
export const defaultUserProfile: UserProfile = {
  id: "",
  email: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
};
