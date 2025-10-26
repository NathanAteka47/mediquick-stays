import { Request, Response, NextFunction } from 'express';
import { Booking } from '../models/Booking';
import { Package } from '../models/Package';
import EmailService from '../services/emailService';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';

// Define add-on prices
const ADD_ON_PRICES: { [key: string]: number } = {
  // Transportation Services
  'airport-transfer': 1500,
  'hospital-shuttle': 800,
  'medical-escort': 2000,
  
  // Meal Services
  'half-board-basic': 200,
  'full-board-basic': 3500,
  'therapeutic-meals': 1000,
  
  // Support Services
  'laundry-service': 500,
  'personal-care': 1200,
  'caregiver-respite': 800
};

// Define medical service prices
const MEDICAL_SERVICE_PRICES: { [key: string]: number } = {
  'nursing-care': 5000,
  'physical-therapy': 2500,
  'occupational-therapy': 2000,
  'medication-management': 1500,
  'vital-monitoring': 1200,
  'wound-care': 1800
};

export class BookingController {
  static async createBooking(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const {
        packageId,
        name,
        email,
        phone,
        checkIn,
        checkOut,
        guests,
        addOns = [],
        medicalServices = [],
        houseNumber,
        apartment,
        city,
        county,
        postcode,
        notes,
        patientCondition,
        specialRequirements,
        // Client-side sync fields
        clientBookingId,
        syncSource = 'server-side'
      } = req.body;

      // Get package details
      const packageItem = await Package.findById(packageId);
      if (!packageItem) {
        throw new AppError('Package not found', 404);
      }

      // Calculate nights and totals
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
      
      const packageTotal = packageItem.price * nights;
      
      // Calculate add-ons total
      const addOnsTotal = addOns.reduce((total: number, addOn: string) => {
        return total + (ADD_ON_PRICES[addOn] || 0);
      }, 0);

      // Calculate medical services total
      const medicalServicesTotal = medicalServices.reduce((total: number, service: string) => {
        return total + (MEDICAL_SERVICE_PRICES[service] || 0);
      }, 0);

      const total = packageTotal + addOnsTotal + medicalServicesTotal;
      const deposit = total * 0.01; // 1% deposit

      // Check for duplicate client-side bookings
      if (clientBookingId) {
        const existingBooking = await Booking.findOne({ clientBookingId });
        if (existingBooking) {
          throw new AppError('Booking already exists', 409);
        }
      }

      // Create booking
      const booking = await Booking.create({
        user: req.user?.userId,
        package: packageId,
        name,
        email,
        phone,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        nights,
        addOns,
        medicalServices,
        packageTotal,
        addOnsTotal,
        medicalServicesTotal,
        total,
        deposit,
        houseNumber,
        apartment,
        city,
        county,
        postcode,
        notes,
        patientCondition,
        specialRequirements,
        clientBookingId,
        syncSource
      });

      // Populate the booking with package details
      await booking.populate('package');

      // Send confirmation email
      try {
        await EmailService.sendBookingConfirmation(email, {
          bookingId: booking._id.toString(),
          name,
          package: packageItem.title,
          checkIn: checkInDate.toLocaleDateString(),
          checkOut: checkOutDate.toLocaleDateString(),
          nights,
          guests,
          packageTotal,
          addOnsTotal,
          medicalServicesTotal,
          total,
          deposit,
          addOns: addOns.length > 0 ? addOns : undefined,
          medicalServices: medicalServices.length > 0 ? medicalServices : undefined
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't throw error, just log it
      }

      // Send admin notification for client-side bookings
      if (syncSource === 'client-side') {
        try {
          await EmailService.sendAdminBookingNotification({
            bookingId: booking._id.toString(),
            clientBookingId: booking.clientBookingId,
            name,
            email,
            phone,
            checkIn: checkInDate.toISOString(),
            checkOut: checkOutDate.toISOString(),
            guests: guests.toString(),
            total,
            deposit,
            packageId,
            addOns,
            medicalServices,
            patientCondition,
            specialRequirements,
            syncSource
          });
        } catch (adminEmailError) {
          console.error('Failed to send admin notification:', adminEmailError);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: {
          booking,
          package: packageItem
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserBookings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;

      const bookings = await Booking.find({ user: userId })
        .populate('package')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: {
          list: bookings,
          total: bookings.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBookingById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const booking = await Booking.findOne({ _id: id, user: userId })
        .populate('package');

      if (!booking) {
        throw new AppError('Booking not found', 404);
      }

      res.json({
        success: true,
        data: booking
      });
    } catch (error) {
      next(error);
    }
  }

  // In your BookingController - update getAllBookings
static async getAllBookings(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { 
      page = 1, 
      limit = 100, // Increased limit to see all bookings
      status, 
      syncSource,
      search 
    } = req.query;

    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (syncSource) {
      filter.syncSource = syncSource;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { clientBookingId: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('📋 Fetching bookings with filter:', filter);

    const bookings = await Booking.find(filter)
      .populate('package')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${bookings.length} bookings in database`);

    res.json({
      success: true,
      data: {
        list: bookings,
        total: bookings.length
      }
    });
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    next(error);
  }
}

  static async updateBookingStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        throw new AppError('Invalid status', 400);
      }

      const booking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate('package').populate('user', 'name email');

      if (!booking) {
        throw new AppError('Booking not found', 404);
      }

      // Send status update email
      try {
        await EmailService.sendBookingStatusUpdate(booking.email, {
          bookingId: booking._id.toString(),
          name: booking.name,
          package: (booking.package as any)?.title || 'Unknown Package',
          status: booking.status,
          previousStatus: req.body.previousStatus // You might want to track this
        });
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }

      res.json({
        success: true,
        message: 'Booking status updated successfully',
        data: booking
      });
    } catch (error) {
      next(error);
    }
  }

  // New method to get sync statistics
  static async getSyncStatistics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await Booking.aggregate([
        {
          $group: {
            _id: '$syncSource',
            count: { $sum: 1 },
            totalRevenue: { $sum: '$total' },
            averageTotal: { $avg: '$total' }
          }
        }
      ]);

      const totalBookings = await Booking.countDocuments();
      const pendingBookings = await Booking.countDocuments({ status: 'pending' });
      const clientSideBookings = await Booking.countDocuments({ syncSource: 'client-side' });

      res.json({
        success: true,
        data: {
          stats,
          summary: {
            totalBookings,
            pendingBookings,
            clientSideBookings,
            serverSideBookings: totalBookings - clientSideBookings
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // New method to find duplicate client-side bookings
  static async findDuplicateBookings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const duplicates = await Booking.aggregate([
        {
          $match: {
            clientBookingId: { $exists: true, $ne: null }
          }
        },
        {
          $group: {
            _id: '$clientBookingId',
            count: { $sum: 1 },
            bookings: { $push: '$$ROOT' }
          }
        },
        {
          $match: {
            count: { $gt: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          duplicates,
          totalDuplicates: duplicates.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // New method to clean up duplicate bookings
  static async cleanupDuplicateBookings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const duplicates = await Booking.aggregate([
        {
          $match: {
            clientBookingId: { $exists: true, $ne: null }
          }
        },
        {
          $group: {
            _id: '$clientBookingId',
            count: { $sum: 1 },
            bookings: { $push: '$$ROOT' }
          }
        },
        {
          $match: {
            count: { $gt: 1 }
          }
        }
      ]);

      let deletedCount = 0;
      const deletionResults = [];

      for (const duplicateGroup of duplicates) {
        // Keep the earliest booking, delete the rest
        const sortedBookings = duplicateGroup.bookings.sort((a: any, b: any) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const bookingsToDelete = sortedBookings.slice(1); // Keep the first one

        for (const booking of bookingsToDelete) {
          await Booking.findByIdAndDelete(booking._id);
          deletionResults.push({
            clientBookingId: booking.clientBookingId,
            bookingId: booking._id,
            deleted: true
          });
          deletedCount++;
        }
      }

      res.json({
        success: true,
        message: `Cleaned up ${deletedCount} duplicate bookings`,
        data: {
          deletedCount,
          results: deletionResults
        }
      });
    } catch (error) {
      next(error);
    }
  }
}