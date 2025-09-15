import React from "react";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    location,
    price,
    sold,
    image,
    type,
    size,
    beds,
    baths,
    features,
  } = property;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/property/${id}`} className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {type}
        </div>
      </Link>

      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">{sold ? "Sold Out" : price}</div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{size}</span>
          </div>
          {beds && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{beds} beds</span>
            </div>
          )}
          {baths && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{baths} baths</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          to={`/property/${id}`}
          className="w-full bg-blue-800 hover:bg-primary text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
