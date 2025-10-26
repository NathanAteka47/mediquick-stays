import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("marlin4off7@gmail.com");
    alert("Thank you for subscribing to our newsletter!");
  };

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/packages", label: "Our Packages" },
    { path: "/blog", label: "Our Blog" },
    { path: "/contact", label: "Contact Us" }
  ];

  const contactInfo = [
    { type: "phone", value: "+25474 6273025" },
    { type: "phone", value: "+25472 579 7001" },
    { type: "phone", value: "+25478 154 9408" },
    { type: "email", value: "mediquickhomestays@gmail.com" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: <img src="/facebook.jpg" alt="Facebook" />, url: "#" },
    { name: "Twitter", icon: <img src="/twitter.jpg" alt="Twitter" />, url: "#" },
    { name: "Instagram", icon: <img src="/instagram.jpg" alt="Instagram" />, url: "#" },
    { name: "LinkedIn", icon: <img src="/linkedin.jpg" alt="LinkedIn" />, url: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  <img src="/mediquick-Web-Logo.png" alt="" />
                </span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Mediquick Stays
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-3 text-sm">
              Your trusted partner in medical accommodation and healthcare journeys. 
              Comfortable stays near medical facilities with compassionate care.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-base">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors hover:underline text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Mediquick Homestays</p>
                  <p className="text-gray-300 text-sm">Nairobi, Kenya</p>
                </div>
              </div>
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <a
                    href={contact.type === "phone" ? `tel:${contact.value}` : `mailto:${contact.value}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-3 text-sm">
              Sign up to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3 py-2 rounded bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Mediquick Stays. All Rights Reserved
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span>Currency: KES</span>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;