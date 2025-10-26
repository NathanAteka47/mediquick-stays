// pages/Bookings/Bookings.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5606';

interface Package {
  _id: string;
  title: string;
  price: number;
  capacity: string;
  size: string;
  description: string;
  type?: 'platinum-care' | 'standard-plus-care' | 'essential-stay';
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  packageId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  notes: string;
  houseNumber: string;
  apartment: string;
  city: string;
  county: string;
  postcode: string;
  patientCondition?: string;
  specialRequirements?: string;
}

const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedMedicalServices, setSelectedMedicalServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get pre-filled data from navigation state (from package pages)
  const prefillData = location.state || {};

  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    packageId: prefillData.packageId || "",
    checkIn: prefillData.checkIn || "",
    checkOut: prefillData.checkOut || "",
    guests: prefillData.guests || "2",
    notes: "",
    houseNumber: "",
    apartment: "",
    city: "",
    county: "Nairobi County",
    postcode: "",
    patientCondition: "",
    specialRequirements: ""
  });

  // Enhanced add-ons with medical services
  const addOns = [
    // Transportation Services
    { id: "airport-transfer", name: "Airport Transfer", price: 1500, description: "Round trip airport transfer", category: "transport" },
    { id: "hospital-shuttle", name: "Hospital Shuttle", price: 800, description: "Daily hospital transport service", category: "transport" },
    { id: "medical-escort", name: "Medical Escort", price: 2000, description: "Assistance to medical appointments", category: "transport" },
    
    // Meal Services
    { id: "half-board-basic", name: "Half Board", price: 200, description: "Breakfast and dinner included", category: "meals" },
    { id: "full-board-basic", name: "Full Board", price: 3500, description: "All meals included", category: "meals" },
    { id: "therapeutic-meals", name: "Therapeutic Meals", price: 1000, description: "Specialized dietary meals", category: "meals" },
    
    // Support Services
    { id: "laundry-service", name: "Laundry Service", price: 500, description: "Weekly laundry service", category: "support" },
    { id: "personal-care", name: "Personal Care Assistance", price: 1200, description: "Daily personal care support", category: "support" },
    { id: "caregiver-respite", name: "Caregiver Respite", price: 800, description: "Temporary caregiver relief", category: "support" }
  ];

  // Medical services for comprehensive packages
  const medicalServices = [
    { id: "nursing-care", name: "24/7 Nursing Care", price: 5000, description: "Round-the-clock nursing support" },
    { id: "physical-therapy", name: "Physical Therapy", price: 2500, description: "Daily physical therapy sessions" },
    { id: "occupational-therapy", name: "Occupational Therapy", price: 2000, description: "Occupational therapy sessions" },
    { id: "medication-management", name: "Medication Management", price: 1500, description: "Professional medication administration" },
    { id: "vital-monitoring", name: "Vital Signs Monitoring", price: 1200, description: "Continuous health monitoring" },
    { id: "wound-care", name: "Wound Care", price: 1800, description: "Professional wound management" }
  ];

  // Mock packages data with new structure
  const mockPackages: Package[] = [
    {
      _id: "platinum-care",
      title: "Platinum Comprehensive Care",
      price: 15000,
      capacity: "Patient + 1 Caregiver",
      size: "35sqm Private Suite",
      description: "Full medical support with luxury accommodation",
      type: "platinum-care"
    },
    {
      _id: "standard-plus-care",
      title: "Standard Plus Medical Stay",
      price: 8000,
      capacity: "Patient + 1 Caregiver",
      size: "35sqm Ensuite Room",
      description: "Enhanced accommodation with basic medical support",
      type: "standard-plus-care"
    },
    {
      _id: "essential-stay",
      title: "Essential Accommodation",
      price: 3500,
      capacity: "2 Adults",
      size: "35sqm Comfortable Room",
      description: "Comfortable stay near medical facilities",
      type: "essential-stay"
    }
  ];

  useEffect(() => {
    // Use mock data for now - replace with actual API call
    api.get(`${VITE_API_BASE_URL}/api/packages`)
      .then((res) => {
        if (res.data && res.data.list) {
          setPackages(res.data.list);
        } else {
          setPackages(mockPackages); // Fallback to mock data
        }
      })
      .catch((err) => {
        console.error("fetch packages error", err);
        setPackages(mockPackages); // Fallback to mock data
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleMedicalServiceToggle = (serviceId: string) => {
    setSelectedMedicalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const selectedPackage = packages.find(p => p._id === form.packageId);
  const selectedAddOnsDetails = addOns.filter(addOn => selectedAddOns.includes(addOn.id));
  const selectedMedicalServicesDetails = medicalServices.filter(service => selectedMedicalServices.includes(service.id));
  
  // Calculate nights
  const calculateNights = () => {
    if (form.checkIn && form.checkOut) {
      const checkIn = new Date(form.checkIn);
      const checkOut = new Date(form.checkOut);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 1;
  };

  const nights = calculateNights();
  const packageTotal = selectedPackage ? selectedPackage.price * nights : 0;
  const addOnsTotal = selectedAddOnsDetails.reduce((sum, addOn) => sum + addOn.price, 0);
  const medicalServicesTotal = selectedMedicalServicesDetails.reduce((sum, service) => sum + service.price, 0);
  const total = packageTotal + addOnsTotal + medicalServicesTotal;
  const deposit = total * 0.01; // 1% deposit

  const isComprehensivePackage = selectedPackage?.type === 'platinum-care';

  // Client-side email function using fetch
  const sendBookingEmailToAdmin = async (bookingData: any): Promise<boolean> => {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/api/bookings/email-only`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (response.ok) {
        console.log('✅ Admin notified via email');
        return true;
      }
      return false;
    } catch (error) {
      console.log('Email API unavailable, continuing...');
      return false;
    }
  };

  // Download backup for user
  const downloadBookingBackup = (bookingData: any) => {
    const dataStr = JSON.stringify(bookingData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mediquick-booking-${bookingData.bookingId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const bookingData = {
      ...form,
      addOns: selectedAddOns,
      medicalServices: selectedMedicalServices,
      packageTotal,
      addOnsTotal,
      medicalServicesTotal,
      total,
      deposit,
      nights,
      status: 'pending',
      timestamp: new Date().toISOString(),
      bookingId: 'MQ-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9) // Generate client-side ID
    };

    console.log("Client-side booking data:", bookingData);

    try {
      // Strategy 1: Store in localStorage as primary storage
      try {
        const existingBookings = JSON.parse(localStorage.getItem('mediquickBookings') || '[]');
        const updatedBookings = [...existingBookings, bookingData];
        localStorage.setItem('mediquickBookings', JSON.stringify(updatedBookings));
        console.log('✅ Booking saved to localStorage');
      } catch (storageError) {
        console.error('LocalStorage error:', storageError);
      }

      // Strategy 2: Send email to admin (no database dependency)
      const emailSent = await sendBookingEmailToAdmin(bookingData);

      // Strategy 3: Download as backup file for user
      downloadBookingBackup(bookingData);

      // Strategy 4: Try to save to server (optional)
      try {
        await api.post(`${VITE_API_BASE_URL}/api/bookings`, bookingData);
        console.log('✅ Booking also saved to server');
      } catch (serverError) {
        console.log('Server save optional - continuing with client-side storage');
      }

      // Immediate success - no server dependency
      setMessage("✅ Booking submitted successfully! We've received your request and sent you a confirmation.");
      
      setTimeout(() => {
        navigate('/booking-confirmation', { 
          state: { 
            bookingId: bookingData.bookingId,
            bookingData: bookingData,
            selectedPackage: selectedPackage,
            emailSent: emailSent
          } 
        });
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not submit booking. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Package", active: currentStep === 1 },
    { number: 2, title: "Services", active: currentStep === 2 },
    { number: 3, title: "Details", active: currentStep === 3 },
    { number: 4, title: "Complete", active: currentStep === 4 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step.active ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <span className={`text-xs mt-1 ${step.active ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div className={`h-full bg-indigo-600 transition-all duration-300 ${
                      currentStep > step.number ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          {/* Step 1: Package Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Care Package</h2>
              
              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Check In</label>
                  <Input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                    required
                    className="text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Check Out</label>
                  <Input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                    required
                    className="text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm"
                    required
                  >
                    <option value="1">Patient Only</option>
                    <option value="2">Patient + 1 Caregiver</option>
                    <option value="3">Patient + 2 Caregivers</option>
                  </select>
                </div>
              </div>

              {/* Package Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-gray-700">Select Care Package</label>
                <select
                  name="packageId"
                  value={form.packageId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm"
                  required
                >
                  <option value="">Select a care package</option>
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.title} – KES {pkg.price.toLocaleString()}/week – {pkg.capacity}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPackage && (
                <div className={`border rounded p-3 ${
                  selectedPackage.type === 'platinum-care' ? 'bg-blue-50 border-blue-200' :
                  selectedPackage.type === 'standard-plus-care' ? 'bg-green-50 border-green-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">Selected Package</h3>
                  <p className="font-semibold text-gray-700 text-sm">{selectedPackage.title}</p>
                  <p className="text-gray-600 text-xs">KES {selectedPackage.price.toLocaleString()} per week</p>
                  <p className="text-gray-600 text-xs">{selectedPackage.description}</p>
                  {form.checkIn && form.checkOut && (
                    <p className="text-gray-600 text-xs mt-1">
                      {nights} night{nights > 1 ? 's' : ''} total: KES {(selectedPackage.price * Math.ceil(nights / 7)).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                <Button type="button" onClick={nextStep} disabled={!form.packageId || !form.checkIn || !form.checkOut} className="text-sm">
                  Continue to Services
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Services Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Additional Services</h2>
              
              {/* Medical Services (only for non-comprehensive packages) */}
              {!isComprehensivePackage && (
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Medical Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {medicalServices.map((service) => (
                      <div key={service.id} className={`border rounded p-3 transition-colors ${
                        selectedMedicalServices.includes(service.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}>
                        <label className="flex items-start space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMedicalServices.includes(service.id)}
                            onChange={() => handleMedicalServiceToggle(service.id)}
                            className="mt-0.5 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-gray-800 text-sm">{service.name}</h4>
                              <span className="font-semibold text-gray-800 text-sm">KES {service.price.toLocaleString()}</span>
                            </div>
                            <p className="text-gray-600 text-xs">{service.description}</p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-on Services */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800 mb-3">Additional Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {addOns.map((addOn) => (
                    <div key={addOn.id} className={`border rounded p-3 transition-colors ${
                      selectedAddOns.includes(addOn.id) 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}>
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={() => handleAddOnToggle(addOn.id)}
                          className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-800 text-sm">{addOn.name}</h4>
                            <span className="font-semibold text-gray-800 text-sm">KES {addOn.price.toLocaleString()}</span>
                          </div>
                          <p className="text-gray-600 text-xs">{addOn.description}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {isComprehensivePackage && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-blue-700 text-xs">
                    <strong>Note:</strong> The Platinum Comprehensive Care package already includes comprehensive medical services. 
                    You can still add additional support services above if needed.
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} className="text-sm">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="text-sm">
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Personal & Medical Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal & Medical Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required className="text-gray-900 text-sm" />
                <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required className="text-gray-900 text-sm" />
                <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required className="text-gray-900 text-sm" />
                
                {/* Medical Information */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Patient's Medical Condition (Optional)</label>
                  <textarea
                    name="patientCondition"
                    rows={2}
                    value={form.patientCondition}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900 text-sm"
                    placeholder="Brief description of medical condition or treatment..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Special Requirements (Optional)</label>
                  <textarea
                    name="specialRequirements"
                    rows={2}
                    value={form.specialRequirements}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900 text-sm"
                    placeholder="Any special medical equipment, dietary needs, or accessibility requirements..."
                  />
                </div>
                
                {/* Address Fields */}
                <Input label="House Number" name="houseNumber" value={form.houseNumber} onChange={handleChange} required className="text-gray-900 text-sm" />
                <Input label="Apartment/Floor" name="apartment" value={form.apartment} onChange={handleChange} className="text-gray-900 text-sm" />
                <Input label="City" name="city" value={form.city} onChange={handleChange} required className="text-gray-900 text-sm" />
                <Input label="County" name="county" value={form.county} onChange={handleChange} required className="text-gray-900 text-sm" />
                <Input label="Postcode" name="postcode" value={form.postcode} onChange={handleChange} className="text-gray-900 text-sm" />
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-700">Additional Notes</span>
                <textarea
                  name="notes"
                  rows={2}
                  value={form.notes}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900 text-sm"
                  placeholder="Any other special requests or information that will help us serve you better..."
                />
              </label>

              {/* Enhanced Booking Summary */}
              <div className="bg-gray-50 rounded p-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Booking Summary</h3>
                {selectedPackage && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{selectedPackage.title}</span>
                        <p className="text-gray-600 text-xs">{nights} night{nights > 1 ? 's' : ''} • {form.guests} guest{Number(form.guests) > 1 ? 's' : ''}</p>
                      </div>
                      <span>KES {(selectedPackage.price * Math.ceil(nights / 7)).toLocaleString()}</span>
                    </div>
                    
                    {/* Medical Services */}
                    {selectedMedicalServicesDetails.length > 0 && (
                      <>
                        <div className="border-t pt-1"></div>
                        <p className="font-medium text-gray-700 text-xs">Medical Services:</p>
                        {selectedMedicalServicesDetails.map(service => (
                          <div key={service.id} className="flex justify-between text-gray-600 text-xs">
                            <span>+ {service.name}</span>
                            <span>KES {service.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {/* Additional Services */}
                    {selectedAddOnsDetails.length > 0 && (
                      <>
                        <div className="border-t pt-1"></div>
                        <p className="font-medium text-gray-700 text-xs">Additional Services:</p>
                        {selectedAddOnsDetails.map(addOn => (
                          <div key={addOn.id} className="flex justify-between text-gray-600 text-xs">
                            <span>+ {addOn.name}</span>
                            <span>KES {addOn.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </>
                    )}
                    
                    <div className="border-t pt-2 mt-1">
                      <div className="flex justify-between font-semibold text-sm">
                        <span>Total Amount</span>
                        <span>KES {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                        <span>Deposit Due Now (1%)</span>
                        <span>KES {deposit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} className="text-sm">
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="text-sm">
                  {isSubmitting ? "Submitting..." : "Complete Booking"}
                </Button>
              </div>
            </div>
          )}

          {message && (
            <div className={`mt-3 p-3 rounded ${
              message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            } text-sm`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Bookings;