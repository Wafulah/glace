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

//defaults
// Default User
export const defaultUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  phoneNumber: "",
  session_token: ""
};

// Default Image
export const defaultImage: Image = {
  id: "",
  url: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Default Category
export const defaultCategory: Category = {
  id: "",
  store: null as any, // Placeholder for Store reference
  name: "",
  imageUrl: "",
  description: "",
  createdAt: new Date(),
  updatedAt: new Date()
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
  createdAt: new Date(),
  updatedAt: new Date(),
  images: [defaultImage]
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
  createdAt: new Date(),
  updatedAt: new Date(),
  images: [defaultImage],
  products: [defaultProduct],
  categories: [defaultCategory],
  counties: []
};

// Default County
export const defaultCounty: County = {
  id: "",
  store: defaultStore,
  name: "",
  description: "",
  createdAt: new Date(),
  updatedAt: new Date()
};

// Default Customer
export const defaultCustomer: Customer = {
  id: "",
  store: defaultStore,
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  phoneNumber: ""
};

// Default OrderItem
export const defaultOrderItem: OrderItem = {
  id: "",
  order: null as any, // Placeholder for Order reference
  product: defaultProduct,
  quantity: 1,
  price: 0
};

// Default Order
export const defaultOrder: Order = {
  id: "",
  store: defaultStore,
  customer: defaultCustomer,
  isPaid: false,
  isDelivered: false,
  phone: "",
  address: "",
  county: defaultCounty,
  createdAt: new Date(),
  updatedAt: new Date(),
  deliveryDate: new Date(),
  orderItems: [defaultOrderItem]
};

// Default UserProfile
export const defaultUserProfile: UserProfile = {
  id: "",
  email: "",
  phoneNumber: "",
  firstName: "",
  lastName: ""
};