import { Request, Response, NextFunction } from 'express';
import { Contact } from '../models/Contact';
import EmailService from '../services/emailService';
import { AppError } from '../middleware/errorHandler';

interface ContactData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
  inquiryType?: 'general' | 'booking' | 'medical' | 'partnership' | 'complaint' | 'other';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export class ContactController {
  static async createContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        name, 
        email, 
        message, 
        subject = 'General Inquiry',
        phone,
        inquiryType = 'general',
        priority = 'medium'
      }: ContactData = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        throw new AppError('Name, email, and message are required fields', 400);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError('Please provide a valid email address', 400);
      }

      const contact = await Contact.create({
        name,
        email,
        message,
        subject,
        phone,
        inquiryType,
        priority,
        status: 'new'
      });

      // Send confirmation email to customer
      try {
        await EmailService.sendContactConfirmation(email, {
          name,
          subject,
          message,
          inquiryType,
          contactId: contact._id.toString()
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't throw error, just log it
      }

      // Send notification email to admin
      try {
        await EmailService.sendContactNotification({
          name,
          email,
          phone: phone || 'Not provided',
          subject,
          message,
          inquiryType,
          priority,
          contactId: contact._id.toString(),
          timestamp: contact.createdAt
        });
      } catch (adminEmailError) {
        console.error('Failed to send admin notification email:', adminEmailError);
        // Don't throw error, just log it
      }

      res.status(201).json({
        success: true,
        message: 'Thank you for your message. We will get back to you within 24 hours.',
        data: {
          contact: {
            id: contact._id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            inquiryType: contact.inquiryType,
            status: contact.status
          },
          nextSteps: [
            'We have received your message and will respond within 24 hours',
            'For urgent matters, please call us at +254-700-000000',
            'Check your email for a confirmation message'
          ]
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        status, 
        inquiryType,
        priority,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const filter: any = {};

      if (status) {
        filter.status = status;
      }

      if (inquiryType) {
        filter.inquiryType = inquiryType;
      }

      if (priority) {
        filter.priority = priority;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { subject: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } }
        ];
      }

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const sort: any = {};
      sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

      const contacts = await Contact.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum);

      const total = await Contact.countDocuments(filter);

      // Get statistics
      const stats = await Contact.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      const inquiryStats = await Contact.aggregate([
        {
          $group: {
            _id: '$inquiryType',
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          list: contacts,
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum),
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
          stats: {
            byStatus: stats,
            byInquiryType: inquiryStats,
            totalContacts: total
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getContactById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const contact = await Contact.findById(id);

      if (!contact) {
        throw new AppError('Contact message not found', 404);
      }

      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateContactStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, adminNotes, assignedTo } = req.body;

      const validStatuses = ['new', 'in-progress', 'resolved', 'closed', 'rejected'];
      if (!validStatuses.includes(status)) {
        throw new AppError('Invalid status', 400);
      }

      const updateData: any = { status };
      if (adminNotes) updateData.adminNotes = adminNotes;
      if (assignedTo) updateData.assignedTo = assignedTo;

      const contact = await Contact.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!contact) {
        throw new AppError('Contact message not found', 404);
      }

      // Send status update email to customer if contact is resolved or closed
      if (status === 'resolved' || status === 'closed') {
        try {
          await EmailService.sendContactResolution(contact.email, {
            name: contact.name,
            subject: contact.subject,
            status: contact.status,
            adminNotes: contact.adminNotes,
            contactId: contact._id.toString()
          });
        } catch (emailError) {
          console.error('Failed to send resolution email:', emailError);
        }
      }

      res.json({
        success: true,
        message: 'Contact status updated successfully',
        data: contact
      });
    } catch (error) {
      next(error);
    }
  }

  static async addContactResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { response, respondedBy, internalNotes } = req.body;

      if (!response) {
        throw new AppError('Response content is required', 400);
      }

      const contact = await Contact.findByIdAndUpdate(
        id,
        {
          $push: {
            responses: {
              response,
              respondedBy: respondedBy || 'System',
              respondedAt: new Date(),
              internalNotes
            }
          },
          status: 'in-progress',
          lastRespondedAt: new Date()
        },
        { new: true, runValidators: true }
      );

      if (!contact) {
        throw new AppError('Contact message not found', 404);
      }

      res.json({
        success: true,
        message: 'Response added successfully',
        data: contact
      });
    } catch (error) {
      next(error);
    }
  }

  static async getContactStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;

      const dateFilter: any = {};
      if (startDate || endDate) {
        dateFilter.createdAt = {};
        if (startDate) dateFilter.createdAt.$gte = new Date(startDate as string);
        if (endDate) dateFilter.createdAt.$lte = new Date(endDate as string);
      }

      const stats = await Contact.aggregate([
        { $match: dateFilter },
        {
          $facet: {
            statusSummary: [
              {
                $group: {
                  _id: '$status',
                  count: { $sum: 1 }
                }
              }
            ],
            inquiryTypeSummary: [
              {
                $group: {
                  _id: '$inquiryType',
                  count: { $sum: 1 }
                }
              }
            ],
            prioritySummary: [
              {
                $group: {
                  _id: '$priority',
                  count: { $sum: 1 }
                }
              }
            ],
            dailyContacts: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                  },
                  count: { $sum: 1 }
                }
              },
              { $sort: { _id: 1 } },
              { $limit: 30 }
            ],
            responseTime: [
              {
                $match: {
                  lastRespondedAt: { $exists: true }
                }
              },
              {
                $project: {
                  responseTimeHours: {
                    $divide: [
                      { $subtract: ['$lastRespondedAt', '$createdAt'] },
                      1000 * 60 * 60
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  averageResponseTime: { $avg: '$responseTimeHours' },
                  maxResponseTime: { $max: '$responseTimeHours' },
                  minResponseTime: { $min: '$responseTimeHours' }
                }
              }
            ]
          }
        }
      ]);

      const totalContacts = await Contact.countDocuments(dateFilter);
      const newContacts = await Contact.countDocuments({ ...dateFilter, status: 'new' });
      const resolvedContacts = await Contact.countDocuments({ ...dateFilter, status: 'resolved' });

      res.json({
        success: true,
        data: {
          summary: {
            totalContacts,
            newContacts,
            resolvedContacts,
            resolutionRate: totalContacts > 0 ? (resolvedContacts / totalContacts) * 100 : 0
          },
          details: stats[0]
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        throw new AppError('Contact message not found', 404);
      }

      res.json({
        success: true,
        message: 'Contact message deleted successfully',
        data: { id }
      });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdateContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids, status, assignedTo } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new AppError('Contact IDs are required', 400);
      }

      const updateData: any = {};
      if (status) updateData.status = status;
      if (assignedTo) updateData.assignedTo = assignedTo;

      const result = await Contact.updateMany(
        { _id: { $in: ids } },
        updateData
      );

      res.json({
        success: true,
        message: `${result.modifiedCount} contacts updated successfully`,
        data: {
          modifiedCount: result.modifiedCount,
          matchedCount: result.matchedCount
        }
      });
    } catch (error) {
      next(error);
    }
  }
}