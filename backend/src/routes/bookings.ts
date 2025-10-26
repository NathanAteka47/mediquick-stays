// routes/bookings.ts
import express, { Request, Response, Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { validateRequest, bookingValidation } from '../middleware/validation';
import { auth, adminAuth } from '../middleware/auth';
import emailService from '../services/emailService';
import Booking from '../models/Booking';
import mongoose from 'mongoose';

// Extend Express Request interface to include user property with required fields
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
        _id?: string;
        [key: string]: any;
      };
    }
  }
}

const router: Router = express.Router();

// Interfaces for request bodies
interface EmailOnlyRequest {
  bookingData: {
    bookingId: string;
    name: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    total: number;
    deposit: number;
    packageId: string;
    addOns?: string[];
    medicalServices?: string[];
    patientCondition?: string;
    specialRequirements?: string;
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
    [key: string]: any;
  };
}

interface SyncBookingsRequest {
  bookings: Array<{
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
    [key: string]: any;
  }>;
}

// Response interfaces
interface BaseResponse {
  ok: boolean;
  message: string;
}

interface EmailOnlyResponse extends BaseResponse {
  bookingId?: string;
}

interface SyncBookingsResponse extends BaseResponse {
  synced?: number;
  duplicates?: number;
  errors?: Array<{ bookingId: string; error: string }>;
}

// User routes
router.post('/', auth, validateRequest(bookingValidation.create), BookingController.createBooking);
router.get('/my-bookings', auth, BookingController.getUserBookings);
router.get('/:id', auth, BookingController.getBookingById);

// Email-only endpoint - no database dependency
router.post('/email-only', async (req: Request<{}, EmailOnlyResponse, EmailOnlyRequest>, res: Response<EmailOnlyResponse>): Promise<void> => {
  try {
    const { bookingData } = req.body;
    
    if (!bookingData || !bookingData.bookingId) {
      res.status(400).json({
        ok: false,
        message: 'Invalid booking data'
      });
      return;
    }
    
    console.log(`📧 Sending email notification for booking: ${bookingData.bookingId}`);
    
    // Send email to admin
    const emailSent = await emailService.sendAdminBookingNotification(bookingData);
    
    if (emailSent) {
      console.log(`✅ Email sent successfully for booking: ${bookingData.bookingId}`);
      res.json({ 
        ok: true, 
        message: 'Notification sent successfully',
        bookingId: bookingData.bookingId 
      });
    } else {
      console.error(`❌ Failed to send email for booking: ${bookingData.bookingId}`);
      res.status(500).json({
        ok: false,
        message: 'Failed to send email notification'
      });
    }
    
  } catch (error: any) {
    console.error('Notification error:', error);
    res.status(500).json({ 
      ok: false, 
      message: error.message || 'Failed to send notifications' 
    });
  }
});

// Sync endpoint for when DB is back online
// In your routes/bookings.ts - update the sync endpoint
router.post('/sync-bookings', adminAuth, async (req: Request<{}, SyncBookingsResponse, SyncBookingsRequest>, res: Response<SyncBookingsResponse>): Promise<void> => {
  try {
    const { bookings } = req.body;
    
    if (!bookings || !Array.isArray(bookings)) {
      res.status(400).json({
        ok: false,
        message: 'Invalid bookings data'
      });
      return;
    }

    if (bookings.length === 0) {
      res.json({
        ok: true,
        message: 'No bookings to sync',
        synced: 0
      });
      return;
    }

    console.log(`🔄 Starting sync for ${bookings.length} client-side bookings...`);

    const savedBookings = [];
    const duplicates = [];
    const errors = [];

    // First, get all packages to map package names to IDs
    const Package = (await import('../models/Package')).Package;
    const packages = await Package.find({});
    const packageMap = new Map();
    
    packages.forEach(pkg => {
      packageMap.set(pkg._id.toString(), pkg._id);
      // Also map by title for backward compatibility
      packageMap.set(pkg.title.toLowerCase(), pkg._id);
    });

    // Process each booking individually to handle duplicates gracefully
    for (const localBooking of bookings) {
      try {
        // Check if booking already exists (by clientBookingId)
        const existingBooking = await Booking.findOne({ 
          clientBookingId: localBooking.bookingId 
        });

        if (existingBooking) {
          console.log(`⏭️  Skipping duplicate booking: ${localBooking.bookingId}`);
          duplicates.push(localBooking.bookingId);
          continue;
        }

        // Resolve package ID - handle both ObjectId and string package names
        let packageId;
        if (mongoose.Types.ObjectId.isValid(localBooking.packageId)) {
          packageId = new mongoose.Types.ObjectId(localBooking.packageId);
        } else {
          // Try to find package by title or other identifier
          const foundPackage = packages.find(pkg => 
            pkg._id.toString() === localBooking.packageId ||
            pkg.title.toLowerCase() === localBooking.packageId.toLowerCase() ||
            pkg._id.toString().includes(localBooking.packageId)
          );
          
          if (foundPackage) {
            packageId = foundPackage._id;
          } else {
            console.warn(`⚠️ Package not found for ID: ${localBooking.packageId}, using fallback`);
            // Use a default package or the first available package as fallback
            packageId = packages[0]?._id || new mongoose.Types.ObjectId();
          }
        }

        // Transform local booking to match your Booking schema
        const bookingToSave = {
          // Use a placeholder user ID for client-side bookings
          user: req.user?._id || new mongoose.Types.ObjectId(),
          package: packageId, // Use the resolved package ID
          name: localBooking.name,
          email: localBooking.email,
          phone: localBooking.phone,
          checkIn: new Date(localBooking.checkIn),
          checkOut: new Date(localBooking.checkOut),
          guests: parseInt(localBooking.guests) || 2,
          nights: localBooking.nights || 1,
          addOns: localBooking.addOns || [],
          medicalServices: localBooking.medicalServices || [],
          packageTotal: localBooking.packageTotal || 0,
          addOnsTotal: localBooking.addOnsTotal || 0,
          medicalServicesTotal: localBooking.medicalServicesTotal || 0,
          total: localBooking.total,
          deposit: localBooking.deposit,
          status: 'pending',
          houseNumber: localBooking.houseNumber,
          apartment: localBooking.apartment,
          city: localBooking.city,
          county: localBooking.county,
          postcode: localBooking.postcode,
          notes: localBooking.notes,
          patientCondition: localBooking.patientCondition,
          specialRequirements: localBooking.specialRequirements,
          clientBookingId: localBooking.bookingId,
          syncSource: 'client-side' as const
        };

        const savedBooking = await Booking.create(bookingToSave);
        savedBookings.push(savedBooking);
        console.log(`✅ Synced booking: ${localBooking.bookingId} with package: ${packageId}`);

      } catch (error: any) {
        console.error(`❌ Error syncing booking ${localBooking.bookingId}:`, error.message);
        errors.push({
          bookingId: localBooking.bookingId,
          error: error.message
        });
      }
    }

    const response: SyncBookingsResponse = {
      ok: true,
      message: `Sync completed. ${savedBookings.length} bookings synced, ${duplicates.length} duplicates skipped, ${errors.length} errors`,
      synced: savedBookings.length
    };

    if (duplicates.length > 0) {
      response.duplicates = duplicates.length;
    }

    if (errors.length > 0) {
      response.errors = errors;
    }

    console.log(`🎉 Sync completed: ${savedBookings.length} successful, ${duplicates.length} duplicates, ${errors.length} errors`);

    res.json(response);
    
  } catch (error: any) {
    console.error('❌ Sync process error:', error);
    res.status(500).json({ 
      ok: false, 
      message: error.message || 'Failed to sync bookings' 
    });
  }
});


// Alternative bulk sync endpoint (faster but less error handling)
router.post('/sync-bookings-bulk', async (req: Request<{}, SyncBookingsResponse, SyncBookingsRequest>, res: Response<SyncBookingsResponse>): Promise<void> => {
  try {
    const { bookings } = req.body;
    
    if (!bookings || !Array.isArray(bookings)) {
      res.status(400).json({
        ok: false,
        message: 'Invalid bookings data'
      });
      return;
    }

    console.log(`🔄 Starting bulk sync for ${bookings.length} bookings...`);

    // Filter out duplicates first
    const uniqueBookings = [];
    const seenIds = new Set();

    for (const booking of bookings) {
      if (!seenIds.has(booking.bookingId)) {
        seenIds.add(booking.bookingId);
        uniqueBookings.push(booking);
      }
    }

    // Transform bookings for bulk insert
    const bookingsToSave = uniqueBookings.map(localBooking => ({
      user: req.user?._id || new mongoose.Types.ObjectId(),
      package: localBooking.packageId,
      name: localBooking.name,
      email: localBooking.email,
      phone: localBooking.phone,
      checkIn: new Date(localBooking.checkIn),
      checkOut: new Date(localBooking.checkOut),
      guests: parseInt(localBooking.guests) || 2,
      nights: localBooking.nights || 1,
      addOns: localBooking.addOns || [],
      medicalServices: localBooking.medicalServices || [],
      packageTotal: localBooking.packageTotal || 0,
      addOnsTotal: localBooking.addOnsTotal || 0,
      medicalServicesTotal: localBooking.medicalServicesTotal || 0,
      total: localBooking.total,
      deposit: localBooking.deposit,
      status: 'pending',
      houseNumber: localBooking.houseNumber,
      apartment: localBooking.apartment,
      city: localBooking.city,
      county: localBooking.county,
      postcode: localBooking.postcode,
      notes: localBooking.notes,
      patientCondition: localBooking.patientCondition,
      specialRequirements: localBooking.specialRequirements,
      clientBookingId: localBooking.bookingId,
      syncSource: 'client-side' as const
    }));

    // Use insertMany with ordered: false to continue on errors
    const result = await Booking.insertMany(bookingsToSave, { ordered: false });
    
    console.log(`✅ Bulk sync completed: ${result.length} bookings synced`);

    res.json({ 
      ok: true, 
      message: `Synced ${result.length} bookings`,
      synced: result.length
    });
    
  } catch (error: any) {
    console.error('Bulk sync error:', error);
    
    // Even if there are errors, insertMany might have inserted some documents
    const insertedCount = error.insertedDocs ? error.insertedDocs.length : 0;
    
    res.status(500).json({ 
      ok: false, 
      message: `Partially completed. ${insertedCount} bookings synced before error`,
      synced: insertedCount
    });
  }
});

// Add this to your bookings routes
router.get('/debug/all-bookings', async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({})
      .populate('package')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    console.log('📊 DEBUG - All bookings in database:', bookings.length);
    
    bookings.forEach((booking, index) => {
      console.log(`Booking ${index + 1}:`, {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        status: booking.status,
        syncSource: booking.syncSource,
        clientBookingId: booking.clientBookingId,
        createdAt: booking.createdAt
      });
    });

    res.json({
      success: true,
      total: bookings.length,
      bookings: bookings
    });
  } catch (error: any) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// In routes/bookings.ts - add a simple test endpoint
router.get('/test-connection', async (req: Request, res: Response) => {
  try {
    const count = await Booking.countDocuments();
    res.json({
      success: true,
      message: 'Database connection successful',
      bookingsCount: count,
      database: mongoose.connection.name,
      connected: mongoose.connection.readyState === 1
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Admin routes
router.get('/', adminAuth, BookingController.getAllBookings);
router.put('/:id/status', adminAuth, BookingController.updateBookingStatus);

export default router;