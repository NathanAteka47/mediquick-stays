// models/Contact.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Contact as ContactType } from '../types';

export interface ContactDocument extends Omit<ContactType, '_id'>, Document {}

const contactSchema = new Schema<ContactDocument>({
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
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  subject: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  }
}, {
  timestamps: true
});

export const Contact = mongoose.model<ContactDocument>('Contact', contactSchema);