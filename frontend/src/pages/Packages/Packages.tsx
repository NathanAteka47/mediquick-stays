import React from "react";
import { Link } from "react-router-dom";

interface Package {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  capacity: string;
  size: string;
  duration: string;
  description: string;
  features: string[];
  badge: string;
  type: 'comprehensive-care' | 'accommodation-plus' | 'accommodation-only';
}

const OurPackages: React.FC = () => {
  const packages: Package[] = [
    {
      id: "platinum-care",
      title: "Platinum Comprehensive Care",
      price: 15000,
      originalPrice: 18000,
      capacity: "Patient + 1 Caregiver",
      size: "35sqm Private Suite",
      duration: "7 nights minimum",
      description: "Full medical support with luxury accommodation for comprehensive care needs",
      features: [
        "24/7 Nursing Care & Medical Monitoring",
        "Daily Therapy Sessions",
        "Airport & Hospital Transfers",
        "Medical Equipment Included",
        "Specialized Meal Preparation",
        "Emergency Response System"
      ],
      badge: "Most Comprehensive",
      type: 'comprehensive-care'
    },
    {
      id: "standard-plus-care",
      title: "Standard Plus Medical Stay",
      price: 8000,
      originalPrice: 9500,
      capacity: "Patient + 1 Caregiver",
      size: "35sqm Ensuite Room",
      duration: "Flexible stay duration",
      description: "Enhanced accommodation with basic medical support and transport services",
      features: [
        "Daily Nursing Check-ins",
        "Hospital Transport Service",
        "Breakfast & Dinner Included",
        "Basic Medical Monitoring",
        "Emergency Support Line",
        "Weekly Housekeeping"
      ],
      badge: "Best Value",
      type: 'accommodation-plus'
    },
    {
      id: "essential-stay",
      title: "Essential Accommodation",
      price: 3500,
      capacity: "2 Adults",
      size: "35sqm Comfortable Room",
      duration: "Flexible stay duration",
      description: "Comfortable and affordable stay near major medical facilities",
      features: [
        "Walking Distance to Hospitals",
        "High-Speed WiFi",
        "Shared Kitchen Access",
        "24/7 Security",
        "Laundry Facilities",
        "Basic Utilities Included"
      ],
      badge: "Budget Friendly",
      type: 'accommodation-only'
    }
  ];

  const getGradientClass = (type: string) => {
    switch (type) {
      case 'comprehensive-care':
        return 'from-blue-500 to-blue-600';
      case 'accommodation-plus':
        return 'from-green-500 to-green-600';
      case 'accommodation-only':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-indigo-500 to-indigo-600';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'comprehensive-care':
        return 'bg-blue-100 text-blue-800';
      case 'accommodation-plus':
        return 'bg-green-100 text-green-800';
      case 'accommodation-only':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-indigo-100 text-indigo-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Comprehensive Care Packages</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our tiered medical accommodation packages designed to meet different healthcare needs. 
            From essential stays to full medical support, we have the right solution for your medical journey.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 ${
                pkg.type === 'comprehensive-care' ? 'border-blue-500 relative' : 'border-gray-100'
              }`}
            >
              {pkg.type === 'comprehensive-care' && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Package Header */}
              <div className={`h-2 bg-gradient-to-r ${getGradientClass(pkg.type)}`}></div>

              {/* Package Image/Badge Area */}
              <div className={`h-48 bg-gradient-to-r ${getGradientClass(pkg.type)} flex items-center justify-center relative`}>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">From</div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="text-3xl font-bold">Ksh{pkg.price.toLocaleString()}</div>
                    {pkg.originalPrice && (
                      <div className="text-xl line-through opacity-70">Ksh{pkg.originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                  <div className="text-lg opacity-90 mt-1">/ day</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(pkg.type)}`}>
                    {pkg.badge}
                  </span>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold text-gray-800">{pkg.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Accommodation:</span>
                    <span className="font-semibold text-gray-800">{pkg.size}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-800">{pkg.duration}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {pkg.features.length > 4 && (
                      <div className="text-sm text-gray-500 mt-2">
                        + {pkg.features.length - 4} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    View Full Details & Services
                  </Link>
                  <Link
                    to="/bookings"
                    className="block w-full border border-indigo-600 text-indigo-600 text-center py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
                  >
                    Book This Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Package Comparison Section */}
        <div className="max-w-6xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Package Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Features & Services</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600">Platinum Care</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600">Standard Plus</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-600">Essential</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "24/7 Nursing Care", platinum: "✓", standardPlus: "Daily", essential: "–" },
                  { feature: "Therapy Sessions", platinum: "Daily", standardPlus: "–", essential: "–" },
                  { feature: "Medical Equipment", platinum: "Included", standardPlus: "Basic", essential: "–" },
                  { feature: "Airport Transfers", platinum: "✓", standardPlus: "✓", essential: "–" },
                  { feature: "Hospital Shuttle", platinum: "Unlimited", standardPlus: "2 trips/day", essential: "–" },
                  { feature: "Meal Service", platinum: "Full Board + Therapeutic", standardPlus: "Breakfast & Dinner", essential: "Self-catering" },
                  { feature: "Medical Monitoring", platinum: "Continuous", standardPlus: "Daily", essential: "–" },
                  { feature: "Emergency Support", platinum: "24/7 Response", standardPlus: "Support Line", essential: "Basic" }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-700">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-blue-600 font-semibold">{row.platinum}</td>
                    <td className="py-3 px-4 text-center text-green-600">{row.standardPlus}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{row.essential}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Additional Info */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose Mediquick Stays & Care?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏥",
                title: "Medical Expertise",
                description: "Partnered with licensed healthcare professionals and medical facilities"
              },
              {
                icon: "🚗",
                title: "Transport Solutions",
                description: "Airport transfers and hospital shuttle services for easy access"
              },
              {
                icon: "🍽️",
                title: "Nutrition Support",
                description: "Therapeutic meal preparation and dietary planning services"
              },
              {
                icon: "🛡️",
                title: "24/7 Support",
                description: "Round-the-clock emergency response and medical coordination"
              },
              {
                icon: "💪",
                title: "Rehabilitation",
                description: "Physical and occupational therapy for recovery and mobility"
              },
              {
                icon: "🏠",
                title: "Home Environment",
                description: "Comfortable, healing-focused accommodation near hospitals"
              },
              {
                icon: "👥",
                title: "Caregiver Support",
                description: "Services and accommodations for family members and caregivers"
              },
              {
                icon: "📞",
                title: "Care Coordination",
                description: "Medical appointment scheduling and treatment coordination"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Proximity Info */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 rounded-2xl shadow-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Strategic Hospital Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Walking Distance (5-10 mins):</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Aga Khan University Hospital</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Nairobi Hospital</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Short Drive (8-15 mins):</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">MP Shah Hospital</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Kenyatta National Hospital</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need Personalized Medical Stay Advice?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our care coordinators are here to help you choose the right package for your specific medical needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-indigo-600 py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
              >
                Get Personalized Consultation
              </Link>
              <a
                href="tel:+254746273025"
                className="border border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-semibold"
              >
                Call: +25474 6273025
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPackages;