import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const Platinum: React.FC = () => {
  const navigate = useNavigate();
  const [bookingDates, setBookingDates] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1"
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({ ...prev, [name]: value }));
  };

  const handleBookNow = () => {
    // Navigate to bookings page with pre-filled data
    navigate('/bookings', { 
      state: { 
        packageId: 'platinum',
        packageTitle: 'Platinum',
        packagePrice: 5000,
        ...bookingDates
      }
    });
  };

  const facilities = [
    "High speed in-room wifi",
    "Mini bar",
    "Swimming pool",
    "Child friendly",
    "Hot tub",
    "Games room",
    "Bath",
    "Wheelchair access"
  ];

  const faqs = [
    {
      question: "My flight arrives early in the morning, what time can I check in?",
      answer: "Early check-in is subject to availability. We recommend contacting us in advance to arrange early check-in."
    },
    {
      question: "Is breakfast included as standard with all rooms?",
      answer: "Breakfast is available as an add-on service. You can select meal options during the booking process."
    },
    {
      question: "Do you provide a child day care service?",
      answer: "We offer child-friendly facilities but do not provide dedicated daycare services. Please contact us for specific childcare needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Platinum Package</h1>
            <p className="text-xl mb-8">King Room - Ultimate Comfort & Luxury</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <div className="text-3xl font-bold">From Ksh5,000 / Night</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Booking Widget */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Stay</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
                  <Input
                    type="date"
                    name="checkIn"
                    value={bookingDates.checkIn}
                    onChange={handleDateChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                  <Input
                    type="date"
                    name="checkOut"
                    value={bookingDates.checkOut}
                    onChange={handleDateChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <select
                    name="guests"
                    value={bookingDates.guests}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {[1,2,3,4].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleBookNow} className="w-full">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Room Description */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Room Description</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. 
                  Nam id nisl scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. 
                  Suspendisse faucibus ac turpis et tincidunt.
                </p>
                <p>
                  Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat. 
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                  Proin hendrerit sit amet est at laoreet.
                </p>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Room Specifications */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Room Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-semibold text-gray-800">2 Adults</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold text-gray-800">35sqm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">View:</span>
                  <span className="font-semibold text-gray-800">City View</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-semibold text-gray-800">King Room</span>
                </div>
              </div>
            </div>

            {/* Video Tour */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Video Tour</h3>
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <p className="font-semibold">Video Tour</p>
                </div>
              </div>
            </div>

            {/* Other Rooms */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Other Rooms</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Standard Plus</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh4,000 / Night</p>
                  <Link 
                    to="/packages/standard-plus" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Standard</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh3,500 / Night</p>
                  <Link 
                    to="/packages/standard" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platinum;