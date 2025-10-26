import React from "react";

type PackageItem = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image?: string;
};

const PackagesList: React.FC<{ items: PackageItem[] }> = ({ items }) => {
  return (
    <section className="py-12 container">
      <h2 className="text-2xl font-bold mb-6">Our Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p._id ?? p.title} className="bg-[#071523] p-6 rounded shadow">
            <div className="h-40 bg-slate-800 rounded mb-4 flex items-center justify-center">{p.image ? <img src={p.image} alt={p.title} /> : <span>Image</span>}</div>
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm mb-4">{p.description}</p>
            <div className="flex items-center justify-between">
              <div className="font-bold">KES {p.price}</div>
              <a className="px-3 py-2 rounded bg-[color:var(--primary)] text-white" href="/bookings">Book</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackagesList;
