// import mongoose from 'mongoose';
import { connectDB } from '../config/database';
import { Package } from '../models/Package';

const packages = [
  {
    title: 'Platinum Package',
    description: 'King Room with premium amenities and ultimate comfort. Perfect for patients and caregivers seeking luxury and convenience during medical stays.',
    price: 5000,
    capacity: '2 Adults',
    size: '35sqm',
    view: 'City View',
    facilities: [
      'High speed in-room wifi',
      'Mini bar',
      'Swimming pool access',
      'Child friendly',
      'Hot tub',
      'Games room',
      'Bath',
      'Wheelchair access',
      'Premium bedding',
      'Executive lounge'
    ],
    images: [],
    type: 'platinum',
    available: true
  },
  {
    title: 'Standard Plus Package',
    description: 'Ensuite room with enhanced comfort features. Designed for medical travelers seeking comfort and convenience at an affordable price.',
    price: 4000,
    capacity: '2 Adults',
    size: '35sqm',
    view: 'City View',
    facilities: [
      'High speed in-room wifi',
      'Mini bar',
      'Swimming pool access',
      'Child friendly',
      'Hot tub',
      'Games room',
      'Bath',
      'Wheelchair access',
      'Comfort bedding',
      'Work desk'
    ],
    images: [],
    type: 'standard-plus',
    available: true
  },
  {
    title: 'Standard Package',
    description: 'Comfortable room with essential amenities. Ideal for budget-conscious medical travelers who need reliable accommodation near hospitals.',
    price: 3500,
    capacity: '2 Adults',
    size: '35sqm',
    view: 'City View',
    facilities: [
      'High speed in-room wifi',
      'Mini bar',
      'Swimming pool access',
      'Child friendly',
      'Hot tub',
      'Games room',
      'Bath',
      'Wheelchair access',
      'Standard bedding'
    ],
    images: [],
    type: 'standard',
    available: true
  }
];

const seedPackages = async () => {
  try {
    await connectDB();

    // Clear existing packages
    await Package.deleteMany({});

    // Insert new packages
    await Package.insertMany(packages);

    console.log('Packages seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding packages:', error);
    process.exit(1);
  }
};

seedPackages();