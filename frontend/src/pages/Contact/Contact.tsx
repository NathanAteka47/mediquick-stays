import React, { useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5606';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    setMessage("Thank you for your message! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any inquiries or assistance with your medical stay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Phone Numbers</h3>
                <div className="space-y-2">
                  {["+25474 6273025", "+25472 579 7001", "+25478 154 9408"].map((phone, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <a href={`tel:${phone}`} className="text-gray-600 hover:text-indigo-600 transition-colors">
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Email</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <a href="mailto:info@medical-stays.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    info@medical-stays.com
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Location</h3>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-600">Mediquick Homestays</p>
                    <p className="text-gray-600">Valley Arcade, Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram"].map((social, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Your Message (Optional)</span>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </label>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>

            {message && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;