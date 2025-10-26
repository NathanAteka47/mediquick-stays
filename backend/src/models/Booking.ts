// models/Booking.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Booking as BookingType } from '../types';

export interface BookingDocument extends Omit<BookingType, '_id'>, Document {}

const bookingSchema = new Schema<BookingDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  } as any,
  package: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  } as any,
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: 1,
    max: 4
  },
  nights: {
    type: Number,
    required: true,
    min: 1
  },
  addOns: [{
    type: String
  }],
  medicalServices: [{
    type: String
  }],
  packageTotal: {
    type: Number,
    required: true,
    min: 0
  },
  addOnsTotal: {
    type: Number,
    required: true,
    min: 0
  },
  medicalServicesTotal: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  deposit: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  houseNumber: String,
  apartment: String,
  city: String,
  county: String,
  postcode: String,
  notes: String,
  patientCondition: String,
  specialRequirements: String,
  // New field for client-side booking tracking
  clientBookingId: {
    type: String,
    unique: true,
    sparse: true // Allows null values while maintaining uniqueness
  },
  // New field to track sync source
  syncSource: {
    type: String,
    enum: ['client-side', 'server-side'],
    default: 'server-side'
  }
}, {
  timestamps: true
});

// Index for better query performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ checkIn: 1, checkOut: 1 });
bookingSchema.index({ clientBookingId: 1 }); // Index for client-side bookings
bookingSchema.index({ syncSource: 1 }); // Index for sync tracking

export const Booking = mongoose.model<BookingDocument>('Booking', bookingSchema);
export default Booking;