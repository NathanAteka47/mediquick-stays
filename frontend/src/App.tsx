import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Bookings from "./pages/Bookings/Bookings";
import AboutUs from "./pages/About/About";
import OurPackages from "./pages/Packages/Packages";
import ContactUs from "./pages/Contact/Contact";
import OurBlog from "./pages/Blog/Blog";
import PackageDetails from "./pages/PackageDetails/PackageDetails";
import BookingConfirmation from "./pages/BoookingConfirmation/BookingConfirmation";
import MyAccount from "./pages/MyAccount/MyAccount";
import AdminDashboard from "./pages/Bookings/Admin";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/packages" element={<OurPackages />} />
          <Route path="/packages/:packageId" element={<PackageDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/admin" element={<AdminDashboard />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/blog" element={<OurBlog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/my-account" element={<MyAccount />} />
          
          {/* Optional: Add a 404 page for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Simple 404 component - you can create a proper page later
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a 
          href="/" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default App;