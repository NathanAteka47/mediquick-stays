// services/emailService.ts
import nodemailer from 'nodemailer';

interface BookingData {
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
  syncSource?: string;
  clientBookingId?: string;
  [key: string]: any;
}

interface BookingConfirmationData {
  bookingId: string;
  name: string;
  package: string;
  checkIn: string;
  checkOut: string;
  nights?: number;
  guests?: number;
  packageTotal?: number;
  addOnsTotal?: number;
  medicalServicesTotal?: number;
  total: number;
  deposit: number;
  addOns?: string[];
  medicalServices?: string[];
}

interface StatusUpdateData {
  bookingId: string;
  name: string;
  package: string;
  status: string;
  previousStatus?: string;
}

// Add these new interfaces for contact emails
interface ContactConfirmationData {
  name: string;
  subject: string;
  message: string;
  inquiryType: string;
  contactId: string;
}

interface ContactNotificationData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  priority: string;
  contactId: string;
  timestamp: Date;
}

interface ContactResolutionData {
  name: string;
  subject: string;
  status: string;
  adminNotes?: string;
  contactId: string;
}
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendAdminBookingNotification(bookingData: BookingData): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: bookingData.syncSource === 'client-side' 
        ? '🚨 New Client-Side Booking - Requires Sync' 
        : '📋 New Booking Received',
      html: this.generateAdminNotificationHTML(bookingData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Admin notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send admin email:', error);
      return false;
    }
  }

  async sendBookingConfirmation(email: string, bookingData: BookingConfirmationData): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Your Mediquick Stays Booking Confirmation',
      html: this.generateCustomerConfirmationHTML(bookingData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Booking confirmation email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error);
      return false;
    }
  }

  async sendBookingStatusUpdate(email: string, statusData: StatusUpdateData): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `📢 Booking Status Update - ${statusData.status.toUpperCase()}`,
      html: this.generateStatusUpdateHTML(statusData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Status update email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Failed to send status update email:', error);
      return false;
    }
  }

  async sendSyncSummary(email: string, syncData: any): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🔄 Client Bookings Sync Summary',
      html: this.generateSyncSummaryHTML(syncData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Sync summary email sent to admin');
      return true;
    } catch (error) {
      console.error('Failed to send sync summary email:', error);
      return false;
    }
  }

   // Contact Email Methods
  async sendContactConfirmation(email: string, contactData: ContactConfirmationData): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✅ Message Received - ${contactData.subject}`,
      html: this.generateContactConfirmationHTML(contactData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Contact confirmation email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Failed to send contact confirmation email:', error);
      return false;
    }
  }

  async sendContactNotification(contactData: ContactNotificationData): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `📧 New Contact Message - ${contactData.priority.toUpperCase()} Priority`,
      html: this.generateContactNotificationHTML(contactData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Contact notification email sent to admin for ${contactData.contactId}`);
      return true;
    } catch (error) {
      console.error('Failed to send contact notification email:', error);
      return false;
    }
  }

  async sendContactResolution(email: string, resolutionData: ContactResolutionData): Promise<boolean> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `📢 Update on Your Inquiry: ${resolutionData.subject}`,
      html: this.generateContactResolutionHTML(resolutionData)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Contact resolution email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Failed to send contact resolution email:', error);
      return false;
    }
  }

  private generateAdminNotificationHTML(bookingData: BookingData): string {
    const isClientSide = bookingData.syncSource === 'client-side';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          ${isClientSide ? `
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
              <h2 style="color: #d97706; margin: 0; font-size: 18px;">🚨 CLIENT-SIDE BOOKING - REQUIRES ATTENTION</h2>
              <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px;">
                This booking was submitted via client-side storage and needs to be synced to the database.
              </p>
            </div>
          ` : `
            <div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
              <h2 style="color: #1e40af; margin: 0; font-size: 18px;">📋 NEW BOOKING RECEIVED</h2>
              <p style="color: #1e40af; margin: 5px 0 0 0; font-size: 14px;">
                A new booking has been submitted through the website.
              </p>
            </div>
          `}

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Guest Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong>Name:</strong><br>
                ${bookingData.name}
              </div>
              <div>
                <strong>Email:</strong><br>
                ${bookingData.email}
              </div>
              <div>
                <strong>Phone:</strong><br>
                ${bookingData.phone}
              </div>
              <div>
                <strong>Booking ID:</strong><br>
                ${bookingData.bookingId}
              </div>
              ${bookingData.clientBookingId ? `
                <div>
                  <strong>Client Booking ID:</strong><br>
                  ${bookingData.clientBookingId}
                </div>
              ` : ''}
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Stay Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong>Check-in:</strong><br>
                ${new Date(bookingData.checkIn).toLocaleDateString()}
              </div>
              <div>
                <strong>Check-out:</strong><br>
                ${new Date(bookingData.checkOut).toLocaleDateString()}
              </div>
              <div>
                <strong>Guests:</strong><br>
                ${bookingData.guests}
              </div>
              <div>
                <strong>Nights:</strong><br>
                ${bookingData.nights || 'N/A'}
              </div>
            </div>
          </div>

          ${bookingData.addOns && bookingData.addOns.length > 0 ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Additional Services</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${bookingData.addOns.map(addOn => `<li>${this.formatServiceName(addOn)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${bookingData.medicalServices && bookingData.medicalServices.length > 0 ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Medical Services</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${bookingData.medicalServices.map(service => `<li>${this.formatServiceName(service)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${bookingData.patientCondition ? `
            <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #0369a1; margin-top: 0;">Medical Condition</h3>
              <p style="margin: 0;">${bookingData.patientCondition}</p>
            </div>
          ` : ''}

          ${bookingData.specialRequirements ? `
            <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #166534; margin-top: 0;">Special Requirements</h3>
              <p style="margin: 0;">${bookingData.specialRequirements}</p>
            </div>
          ` : ''}

          <div style="background: #1f2937; color: white; padding: 20px; border-radius: 6px;">
            <h3 style="margin-top: 0; color: white;">Financial Summary</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <strong>Package Total:</strong><br>
                KES ${(bookingData.packageTotal || 0).toLocaleString()}
              </div>
              <div>
                <strong>Services Total:</strong><br>
                KES ${((bookingData.addOnsTotal || 0) + (bookingData.medicalServicesTotal || 0)).toLocaleString()}
              </div>
              <div>
                <strong>Total Amount:</strong><br>
                KES ${bookingData.total.toLocaleString()}
              </div>
              <div>
                <strong>Deposit Due:</strong><br>
                KES ${bookingData.deposit.toLocaleString()}
              </div>
            </div>
          </div>

          ${isClientSide ? `
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin-top: 20px;">
              <h4 style="color: #d97706; margin-top: 0;">⚠️ Action Required</h4>
              <p style="color: #92400e; margin: 0;">
                This booking is stored in browser localStorage. Please ensure it's properly synced to the database 
                and contact the guest to confirm availability and complete the booking process.
              </p>
            </div>
          ` : ''}

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This is an automated notification from Mediquick Stays Booking System.<br>
              Received at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private generateCustomerConfirmationHTML(bookingData: BookingConfirmationData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #d1fae5; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 24px;">✅</span>
            </div>
            <h1 style="color: #065f46; margin: 0 0 10px 0;">Booking Confirmed!</h1>
            <p style="color: #374151; margin: 0;">Thank you for choosing Mediquick Stays</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #0369a1; margin-top: 0; border-bottom: 2px solid #bae6fd; padding-bottom: 10px;">Booking Reference: ${bookingData.bookingId}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong>Package:</strong><br>
                ${bookingData.package}
              </div>
              <div>
                <strong>Guest Name:</strong><br>
                ${bookingData.name}
              </div>
              <div>
                <strong>Check-in:</strong><br>
                ${bookingData.checkIn}
              </div>
              <div>
                <strong>Check-out:</strong><br>
                ${bookingData.checkOut}
              </div>
              <div>
                <strong>Nights:</strong><br>
                ${bookingData.nights || 'N/A'}
              </div>
              <div>
                <strong>Guests:</strong><br>
                ${bookingData.guests || 'N/A'}
              </div>
            </div>
          </div>

          ${bookingData.addOns && bookingData.addOns.length > 0 ? `
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <h4 style="color: #374151; margin-top: 0;">Additional Services Included:</h4>
              <ul style="margin: 0; padding-left: 20px;">
                ${bookingData.addOns.map(addOn => `<li>${this.formatServiceName(addOn)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${bookingData.medicalServices && bookingData.medicalServices.length > 0 ? `
            <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <h4 style="color: #166534; margin-top: 0;">Medical Services Included:</h4>
              <ul style="margin: 0; padding-left: 20px;">
                ${bookingData.medicalServices.map(service => `<li>${this.formatServiceName(service)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="background: #1f2937; color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: white; text-align: center;">Payment Summary</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${bookingData.packageTotal ? `
                <div>
                  <strong>Package:</strong><br>
                  KES ${bookingData.packageTotal.toLocaleString()}
                </div>
              ` : ''}
              ${bookingData.addOnsTotal ? `
                <div>
                  <strong>Additional Services:</strong><br>
                  KES ${bookingData.addOnsTotal.toLocaleString()}
                </div>
              ` : ''}
              ${bookingData.medicalServicesTotal ? `
                <div>
                  <strong>Medical Services:</strong><br>
                  KES ${bookingData.medicalServicesTotal.toLocaleString()}
                </div>
              ` : ''}
              <div>
                <strong>Total Amount:</strong><br>
                KES ${bookingData.total.toLocaleString()}
              </div>
              <div>
                <strong>Deposit Paid:</strong><br>
                KES ${bookingData.deposit.toLocaleString()}
              </div>
            </div>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h4 style="color: #d97706; margin-top: 0;">📞 Next Steps</h4>
            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
              <li>Our team will contact you within 2 hours to confirm your stay details</li>
              <li>Please keep your phone available for our confirmation call</li>
              <li>Have your identification documents ready for check-in</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0;">Need immediate assistance?</p>
            <p style="color: #374151; font-weight: bold; margin: 0;">Call us at +254-700-000000</p>
            <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
              This is an automated confirmation from Mediquick Stays.<br>
              Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // Contact Email Templates
  private generateContactConfirmationHTML(contactData: ContactConfirmationData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #d1fae5; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 24px;">✅</span>
            </div>
            <h1 style="color: #065f46; margin: 0 0 10px 0;">Message Received!</h1>
            <p style="color: #374151; margin: 0;">Thank you for contacting Mediquick Stays</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #0369a1; margin-top: 0;">Your Message Details</h3>
            <div style="display: grid; gap: 10px;">
              <div>
                <strong>Reference ID:</strong><br>
                ${contactData.contactId}
              </div>
              <div>
                <strong>Subject:</strong><br>
                ${contactData.subject}
              </div>
              <div>
                <strong>Inquiry Type:</strong><br>
                ${this.formatInquiryType(contactData.inquiryType)}
              </div>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h4 style="color: #374151; margin-top: 0;">Your Message</h4>
            <p style="color: #4b5563; margin: 0; line-height: 1.6;">${contactData.message}</p>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h4 style="color: #d97706; margin-top: 0;">What Happens Next?</h4>
            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
              <li>Our team will review your message and respond within 24 hours</li>
              <li>For urgent matters, please call us at +254-700-000000</li>
              <li>Keep this reference ID for future communication: ${contactData.contactId}</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0;">Need immediate assistance?</p>
            <p style="color: #374151; font-weight: bold; margin: 0;">Call us at +254-700-000000</p>
            <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
              This is an automated confirmation from Mediquick Stays.<br>
              Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private generateContactNotificationHTML(contactData: ContactNotificationData): string {
    const priorityColors = {
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444',
      'urgent': '#dc2626'
    };

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: ${priorityColors[contactData.priority as keyof typeof priorityColors] || '#6b7280'}; color: white; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 18px;">📧 NEW CONTACT MESSAGE</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Priority: ${contactData.priority.toUpperCase()}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong>Name:</strong><br>
                ${contactData.name}
              </div>
              <div>
                <strong>Email:</strong><br>
                ${contactData.email}
              </div>
              <div>
                <strong>Phone:</strong><br>
                ${contactData.phone}
              </div>
              <div>
                <strong>Inquiry Type:</strong><br>
                ${this.formatInquiryType(contactData.inquiryType)}
              </div>
              <div>
                <strong>Reference ID:</strong><br>
                ${contactData.contactId}
              </div>
              <div>
                <strong>Received:</strong><br>
                ${contactData.timestamp.toLocaleString()}
              </div>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Message Details</h3>
            <div style="margin-bottom: 15px;">
              <strong>Subject:</strong><br>
              ${contactData.subject}
            </div>
            <div>
              <strong>Message:</strong><br>
              <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e5e7eb; margin-top: 10px;">
                <p style="margin: 0; line-height: 1.6; color: #4b5563;">${contactData.message}</p>
              </div>
            </div>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h4 style="color: #d97706; margin-top: 0;">Action Required</h4>
            <p style="color: #92400e; margin: 0;">
              Please respond to this inquiry within 24 hours. You can access this contact in the admin panel.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This is an automated notification from Mediquick Stays Contact System.<br>
              Received at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private generateContactResolutionHTML(resolutionData: ContactResolutionData): string {
    const statusColors = {
      'resolved': '#065f46',
      'closed': '#1e40af',
      'rejected': '#dc2626'
    };

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: ${statusColors[resolutionData.status as keyof typeof statusColors] || '#6b7280'}; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 24px; color: white;">${this.getResolutionIcon(resolutionData.status)}</span>
            </div>
            <h1 style="color: ${statusColors[resolutionData.status as keyof typeof statusColors] || '#6b7280'}; margin: 0 0 10px 0;">
              Inquiry ${resolutionData.status.toUpperCase()}
            </h1>
            <p style="color: #374151; margin: 0;">Update on your recent contact with Mediquick Stays</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Inquiry Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong>Reference ID:</strong><br>
                ${resolutionData.contactId}
              </div>
              <div>
                <strong>Subject:</strong><br>
                ${resolutionData.subject}
              </div>
              <div>
                <strong>Status:</strong><br>
                <span style="color: ${statusColors[resolutionData.status as keyof typeof statusColors] || '#6b7280'}; font-weight: bold;">
                  ${resolutionData.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          ${resolutionData.adminNotes ? `
            <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: #0369a1; margin-top: 0;">Notes from Our Team</h4>
              <p style="color: #0369a1; margin: 0; line-height: 1.6;">${resolutionData.adminNotes}</p>
            </div>
          ` : ''}

          ${resolutionData.status === 'resolved' ? `
            <div style="background: #d1fae5; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: #065f46; margin-top: 0;">✅ Issue Resolved</h4>
              <p style="color: #065f46; margin: 0;">
                Thank you for bringing this matter to our attention. We're glad we could help resolve your inquiry.
              </p>
            </div>
          ` : ''}

          ${resolutionData.status === 'closed' ? `
            <div style="background: #dbeafe; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: #1e40af; margin-top: 0;">📋 Case Closed</h4>
              <p style="color: #1e40af; margin: 0;">
                This inquiry has been closed. If you have any further questions, please don't hesitate to contact us again.
              </p>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0;">Need further assistance?</p>
            <p style="color: #374151; font-weight: bold; margin: 0;">Contact us at +254-700-000000</p>
            <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
              Mediquick Stays - Healthcare Accommodation Services
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private generateStatusUpdateHTML(statusData: StatusUpdateData): string {
    const statusColors: { [key: string]: string } = {
      'confirmed': '#065f46',
      'pending': '#92400e',
      'cancelled': '#dc2626',
      'completed': '#1e40af'
    };

    const statusMessages: { [key: string]: string } = {
      'confirmed': 'Your booking has been confirmed! We look forward to hosting you.',
      'pending': 'Your booking is being processed. We will contact you shortly.',
      'cancelled': 'Your booking has been cancelled as requested.',
      'completed': 'Thank you for staying with us! We hope to see you again soon.'
    };

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: ${statusColors[statusData.status] || '#6b7280'}; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 24px; color: white;">${this.getStatusIcon(statusData.status)}</span>
            </div>
            <h1 style="color: ${statusColors[statusData.status] || '#6b7280'}; margin: 0 0 10px 0;">
              Booking ${statusData.status.toUpperCase()}
            </h1>
            <p style="color: #374151; margin: 0;">${statusMessages[statusData.status] || 'Your booking status has been updated.'}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong>Booking ID:</strong><br>
                ${statusData.bookingId}
              </div>
              <div>
                <strong>Guest Name:</strong><br>
                ${statusData.name}
              </div>
              <div>
                <strong>Package:</strong><br>
                ${statusData.package}
              </div>
              <div>
                <strong>New Status:</strong><br>
                <span style="color: ${statusColors[statusData.status] || '#6b7280'}; font-weight: bold;">
                  ${statusData.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          ${statusData.status === 'confirmed' ? `
            <div style="background: #d1fae5; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: #065f46; margin-top: 0;">✅ You're All Set!</h4>
              <p style="color: #065f46; margin: 0;">
                Your stay is confirmed. Please arrive at your scheduled check-in time with your identification documents.
              </p>
            </div>
          ` : ''}

          ${statusData.status === 'cancelled' ? `
            <div style="background: #fee2e2; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: #dc2626; margin-top: 0;">ℹ️ Cancellation Information</h4>
              <p style="color: #dc2626; margin: 0;">
                Your booking has been cancelled. If you have any questions about refunds or future bookings, please contact us.
              </p>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0;">Questions about your booking?</p>
            <p style="color: #374151; font-weight: bold; margin: 0;">Contact us at +254-700-000000</p>
            <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
              Mediquick Stays - Healthcare Accommodation Services
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private generateSyncSummaryHTML(syncData: any): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #3b82f6; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 24px; color: white;">🔄</span>
            </div>
            <h1 style="color: #1e40af; margin: 0 0 10px 0;">Sync Summary Report</h1>
            <p style="color: #374151; margin: 0;">Client-side bookings synchronization results</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Sync Results</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div style="background: #d1fae5; padding: 15px; border-radius: 6px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #065f46;">${syncData.synced || 0}</div>
                <div style="color: #065f46;">Bookings Synced</div>
              </div>
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #92400e;">${syncData.duplicates || 0}</div>
                <div style="color: #92400e;">Duplicates Skipped</div>
              </div>
            </div>
          </div>

          ${syncData.errors && syncData.errors.length > 0 ? `
            <div style="background: #fee2e2; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: #dc2626; margin-top: 0;">Sync Errors</h4>
              <ul style="margin: 0; padding-left: 20px; color: #dc2626;">
                ${syncData.errors.map((error: any) => `<li>${error.bookingId}: ${error.error}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              Sync completed at ${new Date().toLocaleString()}<br>
              Mediquick Stays Booking System
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private formatServiceName(serviceId: string): string {
    const serviceNames: { [key: string]: string } = {
      // Transportation
      'airport-transfer': 'Airport Transfer',
      'hospital-shuttle': 'Hospital Shuttle',
      'medical-escort': 'Medical Escort',
      
      // Meals
      'half-board-basic': 'Half Board Meals',
      'full-board-basic': 'Full Board Meals',
      'therapeutic-meals': 'Therapeutic Meals',
      
      // Support
      'laundry-service': 'Laundry Service',
      'personal-care': 'Personal Care Assistance',
      'caregiver-respite': 'Caregiver Respite',
      
      // Medical Services
      'nursing-care': '24/7 Nursing Care',
      'physical-therapy': 'Physical Therapy',
      'occupational-therapy': 'Occupational Therapy',
      'medication-management': 'Medication Management',
      'vital-monitoring': 'Vital Signs Monitoring',
      'wound-care': 'Wound Care'
    };

    return serviceNames[serviceId] || serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

    private formatInquiryType(inquiryType: string): string {
    const typeMap: { [key: string]: string } = {
      'general': 'General Inquiry',
      'booking': 'Booking Related',
      'medical': 'Medical Services',
      'partnership': 'Partnership',
      'complaint': 'Complaint',
      'other': 'Other'
    };
    return typeMap[inquiryType] || inquiryType;
  }

  private getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'confirmed': '✅',
      'pending': '⏳',
      'cancelled': '❌',
      'completed': '🏁'
    };
    return icons[status] || '📋';
  }

  private getResolutionIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'resolved': '✅',
      'closed': '📋',
      'rejected': '❌'
    };
    return icons[status] || 'ℹ️';
  }
}

export default new EmailService();