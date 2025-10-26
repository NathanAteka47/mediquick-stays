import express, { Request, Response, NextFunction } from 'express';
import { ContactController } from '../controllers/contactController';
import { validateRequest, contactValidation } from '../middleware/validation';
import { adminAuth } from '../middleware/auth';
// import { AuthRequest } from '../types';

const router = express.Router();

// Public route
router.post('/', validateRequest(contactValidation.create), ContactController.createContact);

// Admin routes
router.get('/', adminAuth as any, ContactController.getAllContacts);
router.put('/:id/status', adminAuth as any, ContactController.updateContactStatus);

export default router;