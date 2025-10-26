import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const EssentialAccommodation: React.FC = () => {
  const navigate = useNavigate();
  const [bookingDates, setBookingDates] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2"
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({ ...prev, [name]: value }));
  };

  const handleBookNow = () => {
    navigate('/bookings', { 
      state: { 
        packageId: 'essential-stay',
        packageTitle: 'Essential Accommodation',
        packagePrice: 3500, // Updated to daily price
        ...bookingDates
      }
    });
  };

  const includedFeatures = [
    "Clean, Comfortable Room (35sqm)",
    "Shared Kitchen Access",
    "High-Speed WiFi Included",
    "24/7 Security & CCTV",
    "Walking Distance to Major Hospitals",
    "Laundry Facilities Available",
    "Basic Housekeeping (Weekly)",
    "Utilities Included",
    "Comfortable Bedding",
    "Hot Water Supply",
    "Daily Room Cleaning Available",
    "Luggage Storage"
  ];

  const facilityAccess = [
    "Fully Equipped Shared Kitchen",
    "Common Lounge Area",
    "Outdoor Seating Space",
    "Secure Parking Available",
    "Vending Machine Area",
    "Guest Computer Station"
  ];

  const nearbyAmenities = [
    "Pharmacies within 5-minute walk",
    "Supermarkets & Grocery Stores",
    "Restaurants & Cafes nearby",
    "Public Transport Access",
    "Bank ATMs & Money Transfer",
    "Shopping Centers"
  ];

  const faqs = [
    {
      question: "What's included in the Essential Accommodation package?",
      answer: "This package includes a comfortable room with basic amenities, shared kitchen access, WiFi, security, and weekly housekeeping. It's designed for budget-conscious travelers who need affordable accommodation near medical facilities."
    },
    {
      question: "Is the kitchen fully equipped?",
      answer: "Yes, our shared kitchen includes refrigerator, microwave, stove, cooking utensils, and basic cookware. It's maintained daily and available for all guests to use."
    },
    {
      question: "How far are the major hospitals?",
      answer: "We're within walking distance to Aga Khan Hospital (5 mins) and a short drive to Nairobi Hospital (10 mins) and MP Shah Hospital (8 mins)."
    },
    {
      question: "Can I get daily housekeeping?",
      answer: "Weekly housekeeping is included. Daily cleaning is available as an optional add-on service for an additional fee."
    },
    {
      question: "Is this suitable for long-term stays?",
      answer: "Absolutely! Many of our guests stay for extended periods. We offer discounted rates for stays longer than 2 weeks - please contact us for long-term pricing."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-400 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Budget Friendly
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Essential Accommodation</h1>
            <p className="text-xl mb-8">Comfortable & Affordable Stay Near Medical Facilities</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-3xl font-bold">Ksh500</div>
                <div className="text-lg opacity-90">/ day</div>
              </div>
              <p className="text-sm mt-2">Flexible stay duration • Up to 2 Adults</p>
              <p className="text-xs opacity-80 mt-1">Weekly & monthly discounts available</p>
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
                    className="text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                  <Input
                    type="date"
                    name="checkOut"
                    value={bookingDates.checkOut}
                    onChange={handleDateChange}
                    className="text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <select
                    name="guests"
                    value={bookingDates.guests}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleBookNow} className="w-full">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Package Description */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Affordable Comfort</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Our Essential Accommodation package offers excellent value for budget-conscious medical travelers. 
                  Enjoy comfortable, clean accommodation with all the basic amenities you need, located conveniently 
                  near Nairobi's major medical facilities.
                </p>
                <p>
                  Perfect for patients and their families who need affordable lodging without compromising on safety, 
                  cleanliness, or convenience during their medical journey.
                </p>
              </div>
            </div>

            {/* Included Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Included Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facility Access */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shared Facility Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilityAccess.map((facility, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Amenities */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{amenity}</span>
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
            {/* Package Specifications */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Package Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-semibold text-gray-800">Up to 2 Adults</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Room Size:</span>
                  <span className="font-semibold text-gray-800">35sqm Comfortable Room</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Pricing:</span>
                  <span className="font-semibold text-gray-800">Ksh500 / day</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Kitchen:</span>
                  <span className="font-semibold text-gray-800">Shared Access</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Housekeeping:</span>
                  <span className="font-semibold text-gray-800">Weekly Included</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Security:</span>
                  <span className="font-semibold text-gray-800">24/7 & CCTV</span>
                </div>
              </div>
            </div>

            {/* Discount Information */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-2">Extended Stay Discounts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">1 week+ stay:</span>
                  <span className="font-semibold text-green-800">10% discount</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">2 weeks+ stay:</span>
                  <span className="font-semibold text-green-800">15% discount</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">1 month+ stay:</span>
                  <span className="font-semibold text-green-800">20% discount</span>
                </div>
              </div>
              <p className="text-green-600 text-xs mt-3">
                *Discounts applied automatically at checkout
              </p>
            </div>

            {/* Proximity to Hospitals */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nearby Hospitals</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Aga Khan Hospital</span>
                  <span className="text-green-600 font-semibold">5 min walk</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Nairobi Hospital</span>
                  <span className="text-blue-600 font-semibold">10 min drive</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">MP Shah Hospital</span>
                  <span className="text-blue-600 font-semibold">8 min drive</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Kenyatta Hospital</span>
                  <span className="text-blue-600 font-semibold">15 min drive</span>
                </div>
              </div>
            </div>

            {/* Other Packages */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Other Packages</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Platinum Comprehensive Care</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh15,000 / week</p>
                  <p className="text-gray-500 text-xs mb-2">Full medical support with luxury accommodation</p>
                  <Link 
                    to="/packages/platinum-care" 
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Standard Plus Medical Stay</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh8,000 / week</p>
                  <p className="text-gray-500 text-xs mb-2">Enhanced accommodation with basic medical support</p>
                  <Link 
                    to="/packages/standard-plus-care" 
                    className="text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Need Assistance?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Our team is here to help you choose the right accommodation for your needs.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">Call: +25474 6273025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">Email: info@medical-stays.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssentialAccommodation;