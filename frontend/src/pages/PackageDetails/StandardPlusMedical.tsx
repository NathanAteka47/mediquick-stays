import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const StandardPlusMedical: React.FC = () => {
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
        packageId: 'standard-plus-care',
        packageTitle: 'Standard Plus Medical Stay',
        packagePrice: 8000,
        ...bookingDates
      }
    });
  };

  const includedServices = [
    "Daily Nursing Check-ins & Vital Signs Monitoring",
    "Comfortable Ensuite Room (35sqm)",
    "Hospital Transport Service (2 trips daily)",
    "Breakfast & Dinner Included",
    "Basic Medication Management",
    "Emergency Support Line Access",
    "High-Speed WiFi & Utilities",
    "Weekly Housekeeping & Linen Change"
  ];

  const medicalSupport = [
    "Daily nursing assessments",
    "Medication reminders",
    "Basic wound care",
    "Health status monitoring",
    "Emergency response coordination"
  ];

  const accommodationFeatures = [
    "Private Ensuite Room (35sqm)",
    "Comfortable Double Bed",
    "Private Bathroom with Safety Features",
    "Work Desk & Seating Area",
    "Air Conditioning",
    "Secure Storage Space"
  ];

  const supportServices = [
    "Hospital Shuttle (2 trips daily)",
    "Breakfast & Dinner Service",
    "Weekly Housekeeping",
    "Linen & Towel Change",
    "24/7 Emergency Support Line",
    "Basic Medical Equipment Available"
  ];

  const faqs = [
    {
      question: "What level of medical support is included?",
      answer: "This package includes daily nursing check-ins, vital signs monitoring, basic medication management, and emergency support. It's ideal for patients who are relatively stable but require regular medical oversight."
    },
    {
      question: "How many hospital transfers are included?",
      answer: "We provide up to 2 hospital shuttle trips per day for medical appointments. Additional transfers can be arranged at an extra cost if needed."
    },
    {
      question: "Can this package be extended if my medical stay needs to be longer?",
      answer: "Yes, the package is flexible and can be extended based on your medical needs. We recommend informing us in advance to ensure availability."
    },
    {
      question: "What meals are included in the package?",
      answer: "The package includes breakfast and dinner daily. We offer nutritious, balanced meals and can accommodate basic dietary requirements. Lunch can be added as an optional extra."
    },
    {
      question: "Is this suitable for post-surgery recovery?",
      answer: "Yes, this package is excellent for post-surgery patients who don't require intensive medical care but need regular monitoring and support during their recovery period."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-green-400 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Best Value
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Standard Plus Medical Stay</h1>
            <p className="text-xl mb-8">Enhanced Accommodation with Basic Medical Support</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-3xl font-bold">Ksh8,000</div>
                <div className="text-lg opacity-90">/ week</div>
                <div className="text-lg line-through opacity-70">Ksh9,500</div>
              </div>
              <p className="text-sm mt-2">Flexible stay duration • Patient + 1 Caregiver</p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Medical Stay</h2>
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
                    <option value="1">Patient Only</option>
                    <option value="2">Patient + 1 Caregiver</option>
                    <option value="3">Patient + 2 Caregivers</option>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Balanced Medical Support</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Our Standard Plus Medical Stay offers the perfect balance between comfort and essential medical support. 
                  Designed for patients who need regular monitoring but don't require intensive medical care.
                </p>
                <p>
                  This package provides daily nursing oversight, convenient hospital transport, and comfortable accommodation 
                  - everything you need for a smooth medical journey in Nairobi.
                </p>
              </div>
            </div>

            {/* Included Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Included Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includedServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Support */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Support Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalSupport.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Accommodation Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accommodationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Support & Logistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{service}</span>
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
                  <span className="font-semibold text-gray-800">Patient + 1 Caregiver</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Room Size:</span>
                  <span className="font-semibold text-gray-800">35sqm Ensuite Room</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Stay Duration:</span>
                  <span className="font-semibold text-gray-800">Flexible</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Meals:</span>
                  <span className="font-semibold text-gray-800">Breakfast & Dinner</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transport:</span>
                  <span className="font-semibold text-gray-800">Hospital Shuttle (2/day)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Medical Support:</span>
                  <span className="font-semibold text-gray-800">Daily Nursing</span>
                </div>
              </div>
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
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Essential Accommodation</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh3,500 / week</p>
                  <p className="text-gray-500 text-xs mb-2">Comfortable stay near medical facilities</p>
                  <Link 
                    to="/packages/essential-stay" 
                    className="text-gray-600 hover:text-gray-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-2">24/7 Emergency Support</h3>
              <p className="text-red-700 text-sm mb-4">
                Immediate medical assistance and emergency coordination available round-the-clock.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700">Emergency Hotline: +25474 6273025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700">Medical Coordinator On Call</span>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-2">Best Value Package</h3>
              <p className="text-green-700 text-sm">
                This package offers the perfect balance of medical support and comfort at an affordable price. 
                Ideal for most medical travel needs with comprehensive basic services included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardPlusMedical;