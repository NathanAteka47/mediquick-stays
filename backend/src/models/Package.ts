// models/Package.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Package as PackageType } from '../types';

export interface PackageDocument extends Omit<PackageType, '_id'>, Document {}

const packageSchema = new Schema<PackageDocument>({
  title: {
    type: String,
    required: [true, 'Package title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Package description is required']
  },
  price: {
    type: Number,
    required: [true, 'Package price is required'],
    min: 0
  },
  capacity: {
    type: String,
    required: [true, 'Capacity is required']
  },
  size: {
    type: String,
    required: [true, 'Size is required']
  },
  view: {
    type: String,
    required: [true, 'View description is required']
  },
  facilities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ['essential-stay', 'platinum-care', 'standard-plus-care'],
    required: true
  }
}, {
  timestamps: true
});

export const Package = mongoose.model<PackageDocument>('Package', packageSchema);