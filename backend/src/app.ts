import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { errorHandler, notFound } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth';
import packageRoutes from './routes/packages';
import bookingRoutes from './routes/bookings';
import contactRoutes from './routes/contacts';
import adminRoutes from './routes/admin';
import pageRoutes from './routes/pages';
import siteRoutes from './routes/site';
import blogRoutes from './routes/blogs';
import databaseStatusRoutes from './routes/database-status';
import adminAuthRoutes from './routes/admin-auth';

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // increased for development
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Compression
app.use(compression());

// CORS - more flexible for development
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      config.client.url,
      'http://localhost:3934',
      'http://127.0.0.1:3934',
      'https://localhost:3934'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || config.nodeEnv === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware for development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/site', siteRoutes);
app.use('/api', blogRoutes);
app.use('/api/admin/database-status', databaseStatusRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

// Health check with more details
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mediquick Stays API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Mediquick Stays API Server',
    version: '1.0.0',
    environment: config.nodeEnv,
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      bookings: '/api/bookings',
      admin: '/api/admin',
      packages: '/api/packages'
    }
  });
});

// Handle 404
app.use('*', notFound);

// Error handling
app.use(errorHandler);

export default app;