import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const PlatinumComprehensive: React.FC = () => {
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
        packageId: 'platinum-care',
        packageTitle: 'Platinum Comprehensive Care',
        packagePrice: 15000,
        ...bookingDates
      }
    });
  };

  const medicalServices = [
    "24/7 Nursing Care & Medical Monitoring",
    "Daily Physical & Occupational Therapy Sessions",
    "Medication Management & Administration",
    "Vital Signs Monitoring",
    "Wound Care & Dressing Changes",
    "IV Therapy Management"
  ];

  const accommodationFeatures = [
    "Private Medical-Grade Suite (35sqm)",
    "Hospital-Grade Adjustable Beds",
    "En-suite Accessible Bathroom",
    "Medical Equipment (Oxygen, Monitors)",
    "Emergency Call System",
    "Air Conditioning & Air Purification"
  ];

  const supportServices = [
    "Round-trip Airport Transfers",
    "Daily Hospital Shuttle Service",
    "Specialized Therapeutic Meal Preparation",
    "Daily Housekeeping & Laundry",
    "Caregiver Support & Respite Care",
    "Medical Appointment Coordination"
  ];

  const faqs = [
    {
      question: "What medical professionals are available with this package?",
      answer: "Our Platinum package includes access to registered nurses, physical therapists, occupational therapists, and on-call physicians. All medical professionals are licensed and experienced in post-operative and chronic care management."
    },
    {
      question: "Is this package suitable for post-surgery recovery?",
      answer: "Yes, this package is specifically designed for post-surgery recovery. We provide wound care, medication management, therapy sessions, and continuous monitoring to ensure optimal recovery outcomes."
    },
    {
      question: "Can family members stay with the patient?",
      answer: "Absolutely. The package accommodates 1 caregiver comfortably. We provide additional bedding and amenities for family members who wish to stay and support their loved one."
    },
    {
      question: "What medical equipment is included?",
      answer: "We provide hospital-grade adjustable beds, vital signs monitors, mobility aids, oxygen equipment, and emergency call systems. Additional specialized equipment can be arranged based on medical needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-blue-500 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Most Comprehensive
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Platinum Comprehensive Care</h1>
            <p className="text-xl mb-8">Full Medical Support with Luxury Accommodation</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-3xl font-bold">Ksh15,000</div>
                <div className="text-lg opacity-90">/ week</div>
                <div className="text-lg line-through opacity-70">Ksh18,000</div>
              </div>
              <p className="text-sm mt-2">Minimum 7-night stay • Patient + 1 Caregiver</p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Comprehensive Care Stay</h2>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Medical Care Solution</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Our Platinum Comprehensive Care package offers the highest level of medical support combined with luxury accommodation. 
                  Designed for patients requiring continuous medical monitoring, post-operative care, or management of chronic conditions.
                </p>
                <p>
                  This all-inclusive package ensures that both medical and comfort needs are met in a healing-focused environment, 
                  allowing patients to recover with dignity while receiving professional medical attention.
                </p>
              </div>
            </div>

            {/* Medical Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical & Nursing Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalServices.map((service, index) => (
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

            {/* Accommodation Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Accommodation Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accommodationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <span className="font-semibold text-gray-800">35sqm Private Suite</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Minimum Stay:</span>
                  <span className="font-semibold text-gray-800">7 nights</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Meals:</span>
                  <span className="font-semibold text-gray-800">Full Board + Therapeutic</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transport:</span>
                  <span className="font-semibold text-gray-800">Airport + Hospital Shuttle</span>
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
              </div>
            </div>

            {/* Other Packages */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Other Packages</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Standard Plus Medical Stay</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh8,000 / week</p>
                  <p className="text-gray-500 text-xs mb-2">Enhanced accommodation with basic medical support</p>
                  <Link 
                    to="/packages/standard-plus-care" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Essential Accommodation</h4>
                  <p className="text-gray-600 text-sm mb-2">From Ksh3,500 / week</p>
                  <p className="text-gray-500 text-xs mb-2">Comfortable stay near medical facilities</p>
                  <Link 
                    to="/packages/essential-stay" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatinumComprehensive;