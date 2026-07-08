export type UserRole = 'farmer' | 'buyer' | 'supplier' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  phone?: string;
  gender?: string;
  dob?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  weight: string;
  image: string;
  alt: string;
  description?: string;
  stock: number;
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  discount?: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  checked: boolean;
  sellerName: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { title: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  courier: string;
  eta: string;
  createdAt: string;
  address: Address;
  steps: TrackingStep[];
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for delivery' | 'Delivered' | 'Cancelled';

export interface TrackingStep {
  label: string;
  time: string;
  done: boolean;
}

export interface Address {
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  barangay: string;
  postalCode: string;
  street: string;
  defaultAddress: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FarmProfile {
  id: string;
  userId: string;
  name: string;
  size: number;
  soilType: string;
  location: string;
  cropHistory: string[];
}

export interface CropRecord {
  id: string;
  farmId: string;
  cropName: string;
  plantedDate: string;
  harvestDate: string;
  status: 'growing' | 'harvested' | 'planned';
  area: number;
  expectedYield: number;
  actualYield?: number;
}

export interface ActivityLog {
  id: string;
  farmId: string;
  type: 'fertilizer' | 'irrigation' | 'pest_control' | 'planting' | 'harvesting' | 'other';
  description: string;
  date: string;
  cost: number;
}

export interface FinancialRecord {
  id: string;
  farmId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface FarmInventory {
  id: string;
  farmId: string;
  name: string;
  category: 'seeds' | 'fertilizers' | 'equipment' | 'chemicals';
  quantity: number;
  unit: string;
  cost: number;
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  tags: string[];
  replies: number;
  likes: number;
  createdAt: string;
}

export interface AIRecommendation {
  type: 'crop' | 'fertilizer' | 'weather' | 'market' | 'disease';
  title: string;
  description: string;
  confidence: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'ai' | 'weather' | 'crop' | 'promotion' | 'community';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  rating: number;
  totalSales: number;
  joinedDate: string;
  verified: boolean;
}

export interface PromoCampaign {
  id: string;
  sellerId: string;
  title: string;
  discount: number;
  startDate: string;
  endDate: string;
  products: string[];
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
