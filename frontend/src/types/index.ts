export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type Package = {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  capacity: string;
  size: string;
  view?: string;
  facilities?: string[];
};

export type Booking = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  packageId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  houseNumber?: string;
  apartment?: string;
  city?: string;
  county?: string;
  postcode?: string;
  addOns?: string[];
  total?: number;
  deposit?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
  category?: 'meal' | 'service' | 'amenity';
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
  subject?: string;
};

export type BlogPost = {
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  publishedAt: string;
  image?: string;
  tags?: string[];
  category?: string;
};

export type Facility = {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: 'room' | 'common' | 'medical' | 'security';
};

export type RoomType = {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: string;
  size: string;
  view: string;
  images: string[];
  facilities: string[];
  available?: boolean;
};

export type BookingSearchParams = {
  checkIn: string;
  checkOut: string;
  guests: string;
  packageId?: string;
};

export type Payment = {
  _id?: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'bank_transfer' | 'mpesa' | 'card' | 'cash';
  transactionId?: string;
  paidAt?: string;
  createdAt?: string;
};

export type NewsletterSubscription = {
  _id?: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  preferences?: string[];
};

export interface EnhancedPackage extends Package {
  category: 'accommodation-only' | 'accommodation-plus' | 'comprehensive-care';
  includes: {
    accommodation: boolean;
    meals: 'none' | 'breakfast-only' | 'half-board' | 'full-board';
    transportation: {
      airportTransfer: boolean;
      hospitalShuttle: boolean;
      localTransport: boolean;
    };
    medicalSupport: {
      nursingCare: boolean;
      medicalMonitoring: boolean;
      therapyServices: boolean;
      equipmentRental: boolean;
    };
    additionalServices: {
      caregiverSupport: boolean;
      mealPreparation: boolean;
      housekeeping: boolean;
      emergencySupport: boolean;
    };
  };
  proximity: {
    hospital: string;
    distance: string;
    travelTime: string;
  };
  duration: {
    minNights: number;
    maxNights: number;
    extensionPossible: boolean;
  };
}