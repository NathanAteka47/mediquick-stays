import React from "react";
import { useLocation, Link } from "react-router-dom";

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const { bookingId, bookingData, selectedPackage, emailSent } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Booking Request Received! (#{bookingId || "480"})
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Your booking has been successfully submitted.
            </p>
            <p className="text-gray-500">Thank You for choosing Mediquick Stays!</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• We have received your booking request</li>
              <li>• Our team will contact you within 1-2 hours to confirm</li>
              <li>• Please keep your phone available for confirmation</li>
              {emailSent && <li>• We've also sent you an email confirmation</li>}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Reference:</span>
                <span className="font-semibold">{bookingId || "480"}</span>
              </div>
              {selectedPackage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold">{selectedPackage.title}</span>
                </div>
              )}
              {bookingData ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guest Name:</span>
                    <span className="font-semibold">{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-semibold">{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-semibold">{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold">{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">KES {bookingData.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Due:</span>
                    <span className="font-semibold">KES {bookingData.deposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-600">Pending Confirmation</span>
                  </div>
                </>
              ) : (
                // Fallback to static data if no bookingData
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check In:</span>
                    <span className="font-semibold">05/10/2025 at 4:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check Out:</span>
                    <span className="font-semibold">06/10/2025 at 11:00am</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-600">Pending Confirmation</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">📱 Your Booking is Safe</h3>
            <p className="text-blue-700 text-sm">
              Your booking has been stored securely in multiple locations. 
              Even if our systems experience issues, we have your details and will contact you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/my-account"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-center"
            >
              View My Bookings
            </Link>
            <Link
              to="/"
              className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-semibold text-center"
            >
              Back to Home
            </Link>
            <Link
              to="/bookings"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
            >
              Make Another Booking
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need immediate assistance? Call us at <strong>+254-700-000000</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;