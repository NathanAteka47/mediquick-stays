// routes/database-status.ts
import express, { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking';
import { Package } from '../models/Package';
import { Contact } from '../models/Contact';
import { User } from '../models/User';
import { adminAuth } from '../middleware/auth';

const router: Router = express.Router();

interface DatabaseStatus {
  database: {
    connected: boolean;
    name: string;
    host: string;
    collections: string[];
  };
  collections: {
    bookings: {
      total: number;
      clientSide: number;
      serverSide: number;
      byStatus: Array<{ status: string; count: number }>;
    };
    packages: {
      total: number;
      available: number;
      types: Array<{ type: string; count: number }>;
    };
    contacts: {
      total: number;
      byStatus: Array<{ status: string; count: number }>;
    };
    users: {
      total: number;
      byRole: Array<{ role: string; count: number }>;
    };
  };
  syncStatus: {
    lastSyncAttempt?: Date;
    pendingLocalBookings: number;
  };
}

// GET /api/admin/database-status
router.get('/', adminAuth, async (req: Request, res: Response) => {
  try {
    console.log('📊 Checking database status...');

    // Get database connection info
    const db = mongoose.connection.db;
    const collections = await db?.listCollections().toArray();
    const collectionNames = collections?.map(col => col.name) || [];

    // Get counts from all collections
    const [
      bookingCount,
      clientSideBookings,
      serverSideBookings,
      bookingStatusStats,
      packageCount,
      availablePackages,
      packageTypeStats,
      contactCount,
      contactStatusStats,
      userCount,
      userRoleStats
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ syncSource: 'client-side' }),
      Booking.countDocuments({ syncSource: 'server-side' }),
      Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Package.countDocuments(),
      Package.countDocuments({ available: true }),
      Package.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]),
      Contact.countDocuments(),
      Contact.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      User.countDocuments(),
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }])
    ]);

    // Check for local storage bookings (from frontend)
    let pendingLocalBookings = 0;
    try {
      // This is a bit hacky - we're checking frontend local storage from backend
      // In a real app, you might want to track this differently
      const localBookings = req.headers['x-local-bookings'];
      if (localBookings) {
        pendingLocalBookings = JSON.parse(localBookings as string).length;
      }
    } catch (error) {
      // Ignore errors from local storage check
    }

    const status: DatabaseStatus = {
      database: {
        connected: mongoose.connection.readyState === 1,
        name: mongoose.connection.name || 'Unknown',
        host: mongoose.connection.host || 'Unknown',
        collections: collectionNames
      },
      collections: {
        bookings: {
          total: bookingCount,
          clientSide: clientSideBookings,
          serverSide: serverSideBookings,
          byStatus: bookingStatusStats.map(stat => ({ status: stat._id, count: stat.count }))
        },
        packages: {
          total: packageCount,
          available: availablePackages,
          types: packageTypeStats.map(stat => ({ type: stat._id, count: stat.count }))
        },
        contacts: {
          total: contactCount,
          byStatus: contactStatusStats.map(stat => ({ status: stat._id, count: stat.count }))
        },
        users: {
          total: userCount,
          byRole: userRoleStats.map(stat => ({ role: stat._id, count: stat.count }))
        }
      },
      syncStatus: {
        pendingLocalBookings
      }
    };

    console.log('✅ Database status checked successfully');
    
    res.json({
      success: true,
      message: 'Database status retrieved successfully',
      data: status
    });

  } catch (error: any) {
    console.error('❌ Error checking database status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check database status',
      error: error.message
    });
  }
});

// GET /api/admin/database-status/collections
router.get('/collections', adminAuth, async (req: Request, res: Response) => {
  try {
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const collections = await db.listCollections().toArray();
    const collectionDetails = await Promise.all(
      collections.map(async (collection) => {
        const count = await db.collection(collection.name).countDocuments();
        return {
          name: collection.name,
          count: count,
          type: collection.type || 'collection'
        };
      })
    );

    res.json({
      success: true,
      data: {
        collections: collectionDetails,
        totalCollections: collections.length
      }
    });

  } catch (error: any) {
    console.error('Error fetching collections:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch collections',
      error: error.message
    });
  }
});

// GET /api/admin/database-status/bookings-detailed
router.get('/bookings-detailed', adminAuth, async (req: Request, res: Response) => {
  try {
    const { limit = 50 } = req.query;

    const bookings = await Booking.find()
      .populate('package', 'title type price')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    const detailedBookings = bookings.map(booking => ({
      _id: booking._id,
      clientBookingId: booking.clientBookingId,
      syncSource: booking.syncSource,
      name: booking.name,
      email: booking.email,
      package: booking.package,
      status: booking.status,
      total: booking.total,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      createdAt: booking.createdAt
    }));

    res.json({
      success: true,
      data: {
        bookings: detailedBookings,
        total: bookings.length
      }
    });

  } catch (error: any) {
    console.error('Error fetching detailed bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch detailed bookings',
      error: error.message
    });
  }
});

export default router;