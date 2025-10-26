import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Mediquick Stays & Care
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in comprehensive medical accommodation and healthcare journeys
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We provide comprehensive home-based care and medical accommodation for patients and their caregivers. 
              Our integrated services cater to individuals of all ages with various medical needs, offering complete 
              peace of mind to both patients and their loved ones. Through our holistic approach to healthcare, we are 
              committed to enhancing recovery outcomes and overall well-being. With our dedicated medical team and 
              professionally equipped facilities, we ensure your healthcare journey is as comfortable and stress-free as possible.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-indigo-600 text-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              To be East Africa's leading provider of integrated medical accommodation and comprehensive care services, 
              seamlessly blending medical expertise with compassionate hospitality for optimal patient recovery and wellness.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
            
            <div className="space-y-8">
              {/* Ubuntu */}
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Ubuntu</h3>
                <p className="text-gray-600 italic">
                  "I am because you are: we have walked this journey before and would wish to walk with you."
                </p>
              </div>

              {/* Compassion */}
              <div className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
                <p className="text-gray-600">
                  Understanding how difficult it can get to navigate the health system, we will handle you with 
                  kindness, care, and be more than willing to help you have a lasting memory of your journey to wellness.
                </p>
              </div>

              {/* Respect */}
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Respect</h3>
                <p className="text-gray-600">
                  We value you and will therefore strive to treat all with dignity and worth – no matter your 
                  background, position, or opinions.
                </p>
              </div>

              {/* Excellence */}
              <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We are committed to maintaining the highest standards in medical care, accommodation, and 
                  customer service, continuously improving to meet and exceed our patients' expectations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Equipment Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Medical Equipment & Facilities</h2>
            
            {/* Hospital Bed Feature */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Hospital Beds</h3>
                  <p className="text-gray-600 mb-4">
                    Our fully adjustable hospital-grade beds are designed to provide optimal comfort and support 
                    for patients during their recovery journey. Each bed features:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Electric height adjustment for easy patient transfer",
                      "Multi-position backrest for comfortable sitting and resting",
                      "Trendelenburg function for circulatory support",
                      "Side rails for patient safety and support",
                      "IV pole attachments for medical treatments",
                      "Pressure-relief mattresses to prevent bed sores",
                      "Easy-to-use remote control operation",
                      "Wheel locks for stability and mobility"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      <img src="/crankbed.jpg" alt="Medical Crank Bed" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Medical-Grade Comfort</h4>
                    <p className="text-gray-600 text-sm">
                      Designed for recovery with professional healthcare standards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Medical Equipment */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <img src='/wheelchair.jpg' alt='Wheelchair' className='w-30 h-30' />,
                  title: "Mobility Aids",
                  description: "Wheelchairs, walkers, and mobility scooters for easy movement"
                },
                {
                  icon: <img src='/medication.jpg' alt='Medication Management' className='w-30 h-30' />,
                  title: "Medication Management",
                  description: "Locked storage and organization systems for medications"
                },
                {
                  icon: <img src='/stethoscope.jpg' alt='Vital Signs Monitors' className='w-30 h-30' />,
                  title: "Vital Signs Monitors",
                  description: "Digital blood pressure, pulse oximeters, and thermometers"
                },
                {
                  icon: <img src='/water.jpg' alt='Hydration Equipment' className='w-30 h-30' />,
                  title: "Oxygen Equipment",
                  description: "Oxygen concentrators and delivery systems available"
                },
                {
                  icon: <img src='/rehab.jpg' alt='Rehabilitation Equipment' className='w-40 h-30' />,
                  title: "Therapy Equipment",
                  description: "Basic physical therapy and rehabilitation tools"
                },
                {
                  icon: <img src='/emergency.jpg' alt='Emergency Equipment' className='w-40 h-30' />,
                  title: "Emergency Equipment",
                  description: "First aid kits and emergency response systems"
                }
              ].map((equipment, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="text-3xl mb-3">{equipment.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-2">{equipment.title}</h4>
                  <p className="text-gray-600 text-sm">{equipment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Amenities Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Comprehensive Amenities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Medical Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Medical Services</h3>
                {[
                  "24/7 Nursing Care & Monitoring",
                  "Medication Management",
                  "Vital Signs Tracking",
                  "Wound Care & Dressing",
                  "Physical Therapy Sessions",
                  "Occupational Therapy",
                  "Medical Equipment Rental",
                  "Emergency Response System"
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Accommodation Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Accommodation Features</h3>
                {[
                  "Private Ensuite Rooms",
                  "Adjustable Hospital Beds",
                  "Air Conditioning & Heating",
                  "High-Speed WiFi",
                  "Daily Housekeeping",
                  "Laundry Services",
                  "Secure Storage",
                  "Room Service Available"
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Support Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Support Services</h3>
                {[
                  "Airport Transfers",
                  "Hospital Shuttle Service",
                  "Meal Preparation",
                  "Caregiver Support",
                  "Therapeutic Nutrition",
                  "Transport Coordination",
                  "24/7 Security",
                  "Personal Care Assistance"
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Location Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Strategic Medical Location</h2>
            <p className="text-lg mb-6 opacity-90">
              Located in the heart of Nairobi's medical district, we provide easy access to all major hospitals 
              and healthcare facilities, ensuring you're never far from the medical care you need.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { hospital: "Aga Khan", time: "5 min walk" },
                { hospital: "Nairobi Hospital", time: "10 min drive" },
                { hospital: "MP Shah", time: "8 min drive" },
                { hospital: "Kenyatta", time: "15 min drive" }
              ].map((location, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="font-semibold">{location.hospital}</div>
                  <div className="text-sm opacity-80">{location.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;