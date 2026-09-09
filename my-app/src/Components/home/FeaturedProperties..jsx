import React, { useState, useEffect } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  TrendingUp,
  Ruler,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogoSpinner from "../LogoSpinner";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://api.bereoth.com/api/properties?limit=1000",
        );
        if (!response.ok) throw new Error("Failed to load properties");
        const data = await response.json();
        setProperties(data.properties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <LogoSpinner />;
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
        {/* Header - Simplified */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1 mb-4">
            <Home className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Handpicked for you
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Featured Properties
          </h2>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full mb-4"></div>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.slice(0, 6).map((property) => (
            <div
              key={property.id}
              className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
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
                <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>

                <div className="flex items-center gap-4 mb-3 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-3.5 w-3.5" />
                    <span>{property.size}</span>
                  </div>
                  {property.beds && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-3.5 w-3.5" />
                      <span>{property.beds}</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" />
                      <span>{property.baths}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {property.features.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{property.features.length - 3}
                    </span>
                  )}
                </div>

                <Link
                  to={`/property/${property.id}`}
                  className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-2.5 rounded font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            <span>Browse All Properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
