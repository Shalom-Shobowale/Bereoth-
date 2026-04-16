import React from "react";
import { Link } from "react-router-dom";
import { MapPin, FileText, ScrollText, ArrowRight } from "lucide-react";

const PropertyCard = ({ property }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      <Link
        to={`/property/${property.id}`}
        className="relative block overflow-hidden"
      >
        <img
          src={property.images}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-semibold">
          {property.type}
        </div>
        {property.deposit && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-xs font-semibold">
            Deposit: {property.deposit}
          </div>
        )}
      </Link>

      <div className="p-5">
        <h3 className="text-xl font-bold text-primary mb-1">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{property.location}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Sizes Available:</span>
            <span className="font-semibold text-primary">{property.size}</span>
          </div>
        </div>

        {property.price_range && (
          <div className="mb-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pre-Launch Price</span>
              <span className="font-bold text-primary">
                {property.price_range}
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-5">
          {property.features?.map((feature, index) => {
            const icon = feature.toLowerCase().includes("survey")
              ? FileText
              : feature.toLowerCase().includes("deed")
                ? ScrollText
                : null;
            return (
              <div key={index} className="flex items-center gap-1.5">
                {icon && <icon className="h-3.5 w-3.5 text-primary" />}
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            );
          })}
        </div>
        <Link
          to={`/property/${property.id}`}
          className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium text-sm group"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
