import React from "react";
import { useParams } from "react-router-dom";
import PlatinumComprehensive from "./PlatinumComprehensive";
import StandardPlusMedical from "./StandardPlusMedical";
import EssentialAccommodation from "./EssentialAccommodation";

const PackageDetails: React.FC = () => {
  const { packageId } = useParams();

  // Render the appropriate package component based on the packageId
  const renderPackageComponent = () => {
    switch (packageId) {
      case 'platinum-care':
        return <PlatinumComprehensive />;
      case 'standard-plus-care':
        return <StandardPlusMedical />;
      case 'essential-stay':
        return <EssentialAccommodation />;
      // Keep old routes for backward compatibility
      case 'platinum':
        return <PlatinumComprehensive />;
      case 'standard-plus':
        return <StandardPlusMedical />;
      case 'standard':
        return <EssentialAccommodation />;
      default:
        return <PackageNotFound />;
    }
  };

  return renderPackageComponent();
};

// Fallback component for invalid package IDs
const PackageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-6">
            The package you're looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/packages" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            View All Packages
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;