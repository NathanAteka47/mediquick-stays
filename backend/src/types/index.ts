// types/index.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  preferences?: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  capacity: string;
  size: string;
  view: string;
  facilities: string[];
  images: string[];
  available: boolean;
  type: 'platinum' | 'standard-plus' | 'standard' | 'comprehensive-care' | 'accommodation-plus' | 'accommodation-only';
  category: 'medical' | 'accommodation' | 'comprehensive';
  features: {
    medical: string[];
    accommodation: string[];
    amenities: string[];
  };
  inclusions: string[];
  exclusions: string[];
  minStay: number;
  maxStay: number;
  bookingAdvance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  _id: string;
  user: string;
  package: string;
  name: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  nights: number;
  addOns: string[];
  medicalServices: string[];
  packageTotal: number;
  addOnsTotal: number;
  medicalServicesTotal: number;
  total: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  houseNumber?: string;
  apartment?: string;
  city?: string;
  county?: string;
  postcode?: string;
  notes?: string;
  patientCondition?: string;
  specialRequirements?: string;
  clientBookingId?: string;
  syncSource: 'client-side' | 'server-side';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  assignedTo?: string; // Staff member assigned to handle the booking
  specialNotes?: string; // Internal notes for staff
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject: string;
  inquiryType: 'general' | 'booking' | 'medical' | 'partnership' | 'complaint' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in-progress' | 'resolved' | 'closed' | 'rejected';
  assignedTo?: string; // Staff member assigned to handle the contact
  responses: ContactResponse[];
  adminNotes?: string; // Internal notes for staff
  lastRespondedAt?: Date;
  source: 'website' | 'phone' | 'email' | 'walk-in';
  tags: string[];
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactResponse {
  _id: string;
  response: string;
  respondedBy: string;
  respondedAt: Date;
  internalNotes?: string;
  isInternal: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  readTime: number;
  isFeatured: boolean;
  viewCount: number;
  likes: number;
  seoKeywords: string[];
  createdAt: Date;
  updatedAt: Date;
  formattedPublishedDate?: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  category: 'medical' | 'transport' | 'meal' | 'support' | 'other';
  price: number;
  duration?: number; // in minutes
  available: boolean;
  requirements?: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddOn {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'transport' | 'meal' | 'support' | 'medical';
  available: boolean;
  image?: string;
  duration?: number;
  requirements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalService {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'nursing' | 'therapy' | 'monitoring' | 'treatment' | 'other';
  available: boolean;
  requirements?: string[];
  duration?: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailTemplate {
  _id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  category: 'booking' | 'contact' | 'notification' | 'marketing';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'booking' | 'contact';
  recipient: string; // User ID or 'all' or 'admin'
  read: boolean;
  actionUrl?: string;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalBookings: number;
  recentBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  pendingContacts: number;
  totalUsers: number;
  monthlyRevenue: number;
  bookingStatus: {
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
  revenueByPackage: Array<{
    package: string;
    revenue: number;
    bookings: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    revenue: number;
    bookings: number;
  }>;
}

export interface SyncStatistics {
  totalSynced: number;
  clientSideBookings: number;
  serverSideBookings: number;
  syncErrors: number;
  lastSync: Date;
  duplicatesFound: number;
}

// Request and Response Types
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    name?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Email Related Types
export interface EmailData {
  to: string | string[];
  subject: string;
  template: string;
  data: any;
}

export interface BookingEmailData {
  bookingId: string;
  name: string;
  email: string;
  package: string;
  checkIn: string;
  checkOut: string;
  total: number;
  deposit: number;
  nights?: number;
  guests?: number;
  addOns?: string[];
  medicalServices?: string[];
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
  contactId: string;
}

// File Upload Types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Search and Filter Types
export interface BookingFilter {
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  package?: string;
  search?: string;
  syncSource?: string;
}

export interface ContactFilter {
  status?: string;
  inquiryType?: string;
  priority?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

// Sync Related Types
export interface LocalBooking {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  total: number;
  deposit: number;
  status: string;
  timestamp: string;
  packageId: string;
  addOns?: string[];
  medicalServices?: string[];
  packageTotal?: number;
  addOnsTotal?: number;
  medicalServicesTotal?: number;
  nights?: number;
  notes?: string;
  houseNumber?: string;
  apartment?: string;
  city?: string;
  county?: string;
  postcode?: string;
  patientCondition?: string;
  specialRequirements?: string;
}

export interface SyncRequest {
  bookings: LocalBooking[];
}

export interface SyncResponse {
  ok: boolean;
  message: string;
  synced?: number;
  duplicates?: number;
  errors?: Array<{
    bookingId: string;
    error: string;
  }>;
}

// Payment Related Types
export interface Payment {
  _id: string;
  booking: string;
  amount: number;
  currency: string;
  method: 'mpesa' | 'card' | 'bank' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  receiptNumber?: string;
  paidAt?: Date;
  refundedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  phone?: string;
  email: string;
}

// Analytics Types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year';
  startDate: Date;
  endDate: Date;
  metrics: {
    bookings: number;
    revenue: number;
    contacts: number;
    occupancy: number;
    conversion: number;
  };
  trends: {
    bookings: Array<{ date: string; count: number }>;
    revenue: Array<{ date: string; amount: number }>;
    contacts: Array<{ date: string; count: number }>;
  };
}

// Settings Types
export interface AppSettings {
  _id: string;
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  bookingSettings: {
    minAdvanceBooking: number;
    maxAdvanceBooking: number;
    cancellationPolicy: string;
    depositPercentage: number;
  };
  emailSettings: {
    host: string;
    port: number;
    secure: boolean;
    fromEmail: string;
    fromName: string;
  };
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}