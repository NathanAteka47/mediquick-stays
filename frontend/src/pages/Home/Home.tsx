import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const Home: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    serviceType: "accommodation"
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchForm);
  };

  const comprehensivePackages = [
    {
      id: "platinum-care",
      title: "Platinum Comprehensive Care",
      price: 15000,
      originalPrice: 18000,
      capacity: "Patient + 1 Caregiver",
      duration: "7 nights minimum",
      description: "Full medical support with luxury accommodation",
      features: [
        "Private suite with medical-grade facilities",
        "24/7 nursing care & medical monitoring",
        "Daily physical & occupational therapy",
        "Airport transfers & hospital shuttle",
        "Specialized meal preparation",
        "Medical equipment included"
      ],
      services: ["nursing", "therapy", "transport", "meals", "equipment"],
      badge: "Most Comprehensive",
      type: "comprehensive-care"
    },
    {
      id: "standard-plus-care",
      title: "Standard Plus Medical Stay",
      price: 8000,
      originalPrice: 9500,
      capacity: "Patient + 1 Caregiver",
      duration: "Flexible stay",
      description: "Enhanced accommodation with basic medical support",
      features: [
        "Comfortable ensuite room",
        "Daily nursing check-ins",
        "Hospital transport service",
        "Breakfast & dinner included",
        "Basic medical monitoring",
        "Emergency support line"
      ],
      services: ["nursing", "transport", "meals", "monitoring"],
      badge: "Best Value",
      type: "accommodation-plus"
    },
    {
      id: "essential-stay",
      title: "Essential Accommodation",
      price: 3500,
      capacity: "2 Adults",
      duration: "Flexible stay",
      description: "Comfortable stay near medical facilities",
      features: [
        "Clean, comfortable room",
        "High-speed WiFi",
        "Shared kitchen access",
        "Walking distance to hospitals",
        "24/7 security",
        "Laundry facilities"
      ],
      services: ["accommodation", "wifi", "security"],
      badge: "Budget Friendly",
      type: "accommodation-only"
    }
  ];

  const medicalServices = [
    {
      icon: "🏥",
      title: "Medical & Nursing Care",
      description: "Skilled nursing, wound care, medication management, and vital signs monitoring by licensed professionals",
      services: ["Wound Care", "IV Therapy", "Medication Management", "Medical Monitoring"]
    },
    {
      icon: "🔄",
      title: "Rehabilitation Therapy",
      description: "Physical, occupational, and speech therapy to help patients regain independence and improve quality of life",
      services: ["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Mobility Training"]
    },
    {
      icon: "🚗",
      title: "Transport & Logistics",
      description: "Airport transfers, hospital shuttle services, and assistance with medical appointments",
      services: ["Airport Transfers", "Hospital Shuttle", "Appointment Transport", "Local Errands"]
    },
    {
      icon: "🍽️",
      title: "Nutrition & Daily Support",
      description: "Specialized meal preparation, dietary planning, and assistance with daily living activities",
      services: ["Meal Preparation", "Dietary Planning", "Personal Care", "Housekeeping"]
    }
  ];

  const partnerHospitals = [
    { name: "Aga Khan University Hospital", distance: "5 min walk" },
    { name: "Nairobi Hospital", distance: "10 min drive" },
    { name: "MP Shah Hospital", distance: "8 min drive" },
    { name: "Kenyatta National Hospital", distance: "15 min drive" }
  ];

  const blogPosts = [
    {
      title: "Navigating Medical Travel in Nairobi",
      date: "February 5, 2025",
      excerpt: "Essential tips for patients and caregivers seeking medical treatment in Nairobi..."
    },
    {
      title: "Comfortable Recovery Spaces Near Hospitals",
      date: "February 5, 2025",
      excerpt: "How our facilities support healing and recovery journeys..."
    },
    {
      title: "Medical Tourism in Kenya - What You Need to Know",
      date: "February 5, 2025",
      excerpt: "Comprehensive guide to medical tourism facilities and accommodations..."
    },
    {
      title: "Patient-Centric Accommodation Solutions",
      date: "February 5, 2025",
      excerpt: "Creating healing environments for medical travelers and their families..."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section
        className="relative text-white py-16 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/mediquick-gallery-image-5.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-blue-200">Mediquick Stays & Care</span>
            </h1>
            <p className="text-base md:text-lg mb-6 max-w-3xl mx-auto">
              Comprehensive Medical Accommodation & Home-Based Care Services in Nairobi
            </p>
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Medical Support & Nursing Care</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Walking Distance to Major Hospitals</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Transportation & Rehabilitation Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Comprehensive Packages</span>
              </div>
            </div> */}
          </div>

          {/* Enhanced Search Form */}
          <div className="bg-white rounded-xl p-5 shadow-2xl max-w-4xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  name="serviceType"
                  value={searchForm.serviceType}
                  onChange={handleSearchChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm"
                >
                  <option value="accommodation">Accommodation Only</option>
                  <option value="accommodation-care">Accommodation + Care</option>
                  <option value="comprehensive">Comprehensive Care</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Check In</label>
                <Input
                  type="date"
                  name="checkIn"
                  value={searchForm.checkIn}
                  onChange={handleSearchChange}
                  required
                  className="text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Check Out</label>
                <Input
                  type="date"
                  name="checkOut"
                  value={searchForm.checkOut}
                  onChange={handleSearchChange}
                  required
                  className="text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
                <select
                  name="guests"
                  value={searchForm.guests}
                  onChange={handleSearchChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm"
                >
                  <option value="1">1 Guest (Patient)</option>
                  <option value="2">2 Guests (Patient + 1)</option>
                  <option value="3">3 Guests (Patient + 2)</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button as={Link}
              to="/packages" type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm">
                  Find Care Options
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Comprehensive Care Packages Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Packages</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm">
              Choose from our tiered packages designed to meet different medical and accommodation needs. 
              From basic stays to full medical support, we have options for every situation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {comprehensivePackages.map((pkg) => (
              <div key={pkg.id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${
                pkg.type === 'comprehensive-care' ? 'border-blue-500 relative' : 'border-gray-100'
              }`}>
                {pkg.type === 'comprehensive-care' && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`h-1 ${
                  pkg.type === 'comprehensive-care' ? 'bg-blue-500' :
                  pkg.type === 'accommodation-plus' ? 'bg-green-500' :
                  'bg-gray-400'
                }`}></div>
                
                <div className="p-5">
                  <div className="text-center mb-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                      pkg.type === 'comprehensive-care' ? 'bg-blue-100 text-blue-800' :
                      pkg.type === 'accommodation-plus' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.badge}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{pkg.title}</h3>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <span className="text-xl font-bold text-indigo-600">
                        Ksh{pkg.price.toLocaleString()}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          Ksh{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">/ week</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-1">{pkg.duration}</p>
                    <p className="text-gray-600 text-xs">{pkg.description}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="block w-full bg-indigo-600 text-white text-center py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm"
                    >
                      View Full Details
                    </Link>
                    <Link
                      to="/bookings"
                      className="block w-full border border-indigo-600 text-indigo-600 text-center py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors font-semibold text-sm"
                    >
                      Book This Package
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button as={Link} to="/packages" variant="primary" size="lg" className="text-sm">
              Compare All Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Medical Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Medical & Support Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm">
              Comprehensive home-based care services designed to support patients and their families 
              throughout their medical journey in Nairobi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {medicalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-base font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-xs mb-3">{service.description}</p>
                <div className="space-y-1">
                  {service.services.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Nursing Assistant Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Meet Our Certified Nursing Assistant</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm">
              Professional, compassionate care from our certified nursing assistant dedicated to your well-being and recovery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Profile Image Section */}
                <div className="bg-blue-600 p-6 flex items-center justify-center lg:justify-start">
                  <div className="text-center lg:text-left">
                    <div className="w-24 h-24 bg-white rounded-full mx-auto lg:mx-0 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-blue-600 text-3xl">
                        <img src="./Laura2.jpg" alt="" />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Laura Dindi</h3>
                    <p className="text-blue-100 font-semibold text-sm">Certified Nursing Assistant</p>
                    <div className="mt-3 flex flex-col space-y-1">
                      <a href="tel:+254746273025" className="text-white hover:text-blue-200 transition-colors flex items-center justify-center lg:justify-start space-x-1 text-sm">
                        <span>📞</span>
                        <span>+254 746 273025</span>
                      </a>
                      <a href="mailto:lauradindi29@gmail.com" className="text-white hover:text-blue-200 transition-colors flex items-center justify-center lg:justify-start space-x-1 text-sm">
                        <span>✉️</span>
                        <span>lauradindi29@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Skills and Specialties */}
                <div className="col-span-2 p-6">
                  <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-3">Areas of Expertise</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        "Pediatrics",
                        "Emergency Care", 
                        "Patient Counseling",
                        "End of Life Care Services",
                        "Vital Signs Monitoring",
                        "Geriatric & Elderly Care",
                        "Hospice & Palliative Care",
                        "Medical Home Care"
                      ].map((skill, index) => (
                        <div key={index} className="bg-white rounded px-2 py-1 shadow-sm border border-gray-100">
                          <span className="text-xs text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 border-l-4 border-blue-500">
                    <p className="text-gray-600 text-xs">
                      Providing compassionate, professional nursing care through <strong>Mediquick Home Based Care & Wellness services</strong> 
                      and <strong>Mediquick Medical Guest House</strong>. Dedicated to ensuring patient comfort, safety, and optimal recovery outcomes.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button 
                      as={Link} 
                      to="/bookings" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Book Appointment
                    </Button>
                    <Button 
                      as={Link} 
                      to="/about" 
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Learn More About Our Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Proximity Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Strategic Hospital Locations</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Our facilities are strategically located near Nairobi's major medical centers, 
              ensuring quick and easy access to healthcare services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {partnerHospitals.map((hospital, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{hospital.name}</h3>
                  <p className="text-blue-600 font-medium text-xs">{hospital.distance}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
              <h3 className="font-bold text-green-800 mb-1 text-sm">24/7 Emergency Support</h3>
              <p className="text-green-700 text-xs">
                Round-the-clock emergency assistance and medical coordination services available for all our guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Story Section */}
      <section
        className="relative py-12 text-white bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/21-1470x920.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">More Than Just Accommodation</h2>
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="mb-4">
                At Mediquick Stays & Care, we understand that medical journeys require comprehensive support. 
                That's why we've evolved from simple accommodation to complete medical stay solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <h4 className="font-bold mb-1 text-sm">Medical Expertise</h4>
                  <p className="text-xs">Partnered with licensed healthcare professionals and therapists</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <h4 className="font-bold mb-1 text-sm">Complete Care</h4>
                  <p className="text-xs">From accommodation to rehabilitation and daily support services</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <h4 className="font-bold mb-1 text-sm">Peace of Mind</h4>
                  <p className="text-xs">24/7 support and emergency services for patients and families</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Facilities Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Comprehensive Facilities</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
              With convenient locations near major medical centers, our facilities offer a comfortable, supportive 
              environment that promotes healing and peace of mind. Whether you're seeking short-term home-based care 
              during treatment or a longer stay for recovery, our team is dedicated to offering compassionate, 
              personalized care.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-6">
              {[
                { name: "24/7 Medical Support", icon: "🏥" },
                { name: "High-Speed WiFi", icon: "📶" },
                { name: "Transport Services", icon: "🚗" },
                { name: "Therapy Rooms", icon: "💪" },
                { name: "Secure Environment", icon: "🛡️" },
                { name: "Meal Preparation", icon: "🍽️" },
                { name: "Caregiver Support", icon: "👥" },
                { name: "Emergency Response", icon: "🚨" }
              ].map((facility, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-1">{facility.icon}</div>
                  <p className="text-xs text-gray-600">{facility.name}</p>
                </div>
              ))}
            </div>
            <Button as={Link} to="/about" variant="primary" className="mt-6 text-sm">
              Learn More About Our Facilities
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">From Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2 text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                  <p className="text-gray-600 text-xs">{post.excerpt}</p>
                  <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs mt-2">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button as={Link} to="/blog" variant="primary" className="text-sm">
              Read Our Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section
        className="relative py-12 text-white bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/mediquick-gallery-image-1.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-blue-200">Ready to Discuss Your Medical Stay Needs?</span>
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-sm">
            Contact us for a personalized consultation and let us help you create the perfect care package for your situation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              as={Link}
              to="/packages"
              variant="secondary"
              size="lg"
              className="bg-white text-indigo-700 font-semibold hover:bg-indigo-50 text-sm"
            >
              View Our Packages
            </Button>

            <Button
              as={Link}
              to="/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-indigo-600 text-sm"
            >
              Get Personalized Advice
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;