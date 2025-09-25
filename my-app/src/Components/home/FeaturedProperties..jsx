import React, { useState, useEffect } from "react";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/mockProperties.json"); // ✅ fetch from public folder
        if (!response.ok) throw new Error("Failed to load properties");
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p className="text-lg text-gray-600">Loading properties...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600">
            Discover our handpicked selection of premium properties
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.slice(0, 6).map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/property/${property.id}`} className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-accent px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </div>
                {property.deposite && (
                  <div className="absolute top-4 right-4 text-secondary px-3 py-1 rounded-full text-sm font-bold">
                    Deposit: {property.deposite}
                  </div>
                )}
              </Link>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                {/* <div className="text-2xl font-bold text-primary mb-4">
                  {property.sold ? "Sold Out" : property.price}
                </div> */}
                <div className="flex items-center space-x-4 mb-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.size}</span>
                  </div>
                  {property.beds && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.beds} beds</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.baths} baths</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Link to={`/property/${property.id}`} className="w-full bg-blue-800 hover:bg-primary text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/properties"
            className="bg-blue-900 hover:bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
