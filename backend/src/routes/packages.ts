import express from 'express';
import { PackageController } from '../controllers/packageController';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', PackageController.getAllPackages);
router.get('/:id', PackageController.getPackageById);
router.get('/type/:type', PackageController.getPackageByType);

// Admin routes
router.post('/', adminAuth as any, PackageController.createPackage);
router.put('/:id', adminAuth as any, PackageController.updatePackage);
router.delete('/:id', adminAuth as any, PackageController.deletePackage);

export default router;