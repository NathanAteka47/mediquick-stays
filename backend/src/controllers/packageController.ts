import { Request, Response, NextFunction } from 'express';
import { Package } from '../models/Package';
import { AppError } from '../middleware/errorHandler';

export class PackageController {
  static async getAllPackages(req: Request, res: Response, next: NextFunction) {
    try {
      const packages = await Package.find({ available: true }).sort({ price: 1 });

      res.json({
        success: true,
        data: {
          list: packages,
          total: packages.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPackageById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const packageItem = await Package.findById(id);
      if (!packageItem) {
        throw new AppError('Package not found', 404);
      }

      res.json({
        success: true,
        data: packageItem
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPackageByType(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.params;

      const packageItem = await Package.findOne({ type, available: true });
      if (!packageItem) {
        throw new AppError('Package not found', 404);
      }

      res.json({
        success: true,
        data: packageItem
      });
    } catch (error) {
      next(error);
    }
  }

  static async createPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const packageData = req.body;

      const newPackage = await Package.create(packageData);

      res.status(201).json({
        success: true,
        message: 'Package created successfully',
        data: newPackage
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedPackage = await Package.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedPackage) {
        throw new AppError('Package not found', 404);
      }

      res.json({
        success: true,
        message: 'Package updated successfully',
        data: updatedPackage
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const packageItem = await Package.findByIdAndDelete(id);
      if (!packageItem) {
        throw new AppError('Package not found', 404);
      }

      res.json({
        success: true,
        message: 'Package deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}