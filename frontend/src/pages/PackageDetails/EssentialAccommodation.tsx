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
      <section className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-400 inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3">
              Budget Friendly
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Essential Accommodation</h1>
            <p className="text-sm mb-6">Comfortable & Affordable Stay Near Medical Facilities</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
              <div className="flex items-center justify-center space-x-2">
                <div className="text-xl font-bold">Ksh500</div>
                <div className="text-sm opacity-90">/ day</div>
              </div>
              <p className="text-xs mt-1">Flexible stay duration • Up to 2 Adults</p>
              <p className="text-xs opacity-80 mt-1">Weekly & monthly discounts available</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Booking Widget */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Book Your Stay</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Check In</label>
                  <Input
                    type="date"
                    name="checkIn"
                    value={bookingDates.checkIn}
                    onChange={handleDateChange}
                    className="text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Check Out</label>
                  <Input
                    type="date"
                    name="checkOut"
                    value={bookingDates.checkOut}
                    onChange={handleDateChange}
                    className="text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    name="guests"
                    value={bookingDates.guests}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleBookNow} className="w-full text-sm">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Package Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Affordable Comfort</h2>
              <div className="text-gray-600 text-sm">
                <p className="mb-3">
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Included Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facility Access */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Shared Facility Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {facilityAccess.map((facility, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700 text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Nearby Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {nearbyAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3">
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Package Specifications */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-base font-bold text-gray-800 mb-3">Package Specifications</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Capacity:</span>
                  <span className="font-semibold text-gray-800 text-sm">Up to 2 Adults</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Room Size:</span>
                  <span className="font-semibold text-gray-800 text-sm">35sqm Comfortable Room</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Pricing:</span>
                  <span className="font-semibold text-gray-800 text-sm">Ksh500 / day</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Kitchen:</span>
                  <span className="font-semibold text-gray-800 text-sm">Shared Access</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Housekeeping:</span>
                  <span className="font-semibold text-gray-800 text-sm">Weekly Included</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Security:</span>
                  <span className="font-semibold text-gray-800 text-sm">24/7 & CCTV</span>
                </div>
              </div>
            </div>

            {/* Discount Information */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="text-base font-bold text-green-800 mb-1">Extended Stay Discounts</h3>
              <div className="space-y-1 text-xs">
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
              <p className="text-green-600 text-xs mt-2">
                *Discounts applied automatically at checkout
              </p>
            </div>

            {/* Proximity to Hospitals */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-base font-bold text-gray-800 mb-3">Nearby Hospitals</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">Aga Khan Hospital</span>
                  <span className="text-green-600 font-semibold text-xs">5 min walk</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">Nairobi Hospital</span>
                  <span className="text-blue-600 font-semibold text-xs">10 min drive</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">MP Shah Hospital</span>
                  <span className="text-blue-600 font-semibold text-xs">8 min drive</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">Kenyatta Hospital</span>
                  <span className="text-blue-600 font-semibold text-xs">15 min drive</span>
                </div>
              </div>
            </div>

            {/* Other Packages */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-base font-bold text-gray-800 mb-3">Other Packages</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded p-3 hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">Platinum Comprehensive Care</h4>
                  <p className="text-gray-600 text-xs mb-1">From Ksh15,000 / week</p>
                  <p className="text-gray-500 text-xs mb-1">Full medical support with luxury accommodation</p>
                  <Link 
                    to="/packages/platinum-care" 
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="border border-gray-200 rounded p-3 hover:border-green-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">Standard Plus Medical Stay</h4>
                  <p className="text-gray-600 text-xs mb-1">From Ksh8,000 / week</p>
                  <p className="text-gray-500 text-xs mb-1">Enhanced accommodation with basic medical support</p>
                  <Link 
                    to="/packages/standard-plus-care" 
                    className="text-green-600 hover:text-green-700 font-semibold text-xs"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-base font-bold text-blue-800 mb-1">Need Assistance?</h3>
              <p className="text-blue-700 text-xs mb-3">
                Our team is here to help you choose the right accommodation for your needs.
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">Call: +25474 6273025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
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