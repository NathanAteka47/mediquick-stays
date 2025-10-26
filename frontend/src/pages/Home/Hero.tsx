import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#08304a] to-[#0a2b3f] py-20">
      <div className="container text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4" style={{ color: 'var(--primary)' }}>
          Comfort when it matters most
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Affordable, secure and verified stays close to major hospitals. Book online and get instant confirmations.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/bookings" className="px-6 py-3 rounded bg-[color:var(--primary)] text-white font-semibold">Book Now</a>
          <a href="/packages" className="px-6 py-3 rounded border border-slate-600">View Packages</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
