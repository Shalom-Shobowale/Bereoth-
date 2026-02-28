import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../properties/PropertyCard";
import PropertyFilters from "../properties/PropertyFilters";
import LogoSpinner from "../LogoSpinner";
import HeroSection2 from "../home/HeroSection2";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  const location = useLocation();

  // Extract URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const initialFilters = {
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    priceRange: searchParams.get("priceRange") || "",
    minBeds: searchParams.get("minBeds") || "",
  };

  // Apply filters
  const applyFilters = (allProperties, filters) => {
    let filtered = allProperties;

    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) =>
          property.type?.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");
      const minValue = parseInt(min) * 1000000;
      const maxValue = max && max !== "+" ? parseInt(max) * 1000000 : Infinity;

      filtered = filtered.filter((property) => {
        const price = parseInt(property.price.replace(/[^\d]/g, ""));
        return price >= minValue && price <= maxValue;
      });
    }

    // if (filters.minBeds) {
    //   filtered = filtered.filter((property) =>
    //     property.beds ? property.beds >= parseInt(filters.minBeds) : true
    //   );
    // }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  // Fetch properties & apply filters if any
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://api.bereoth.com/api/properties?limit=1000"
        );
        const result = await response.json();

        console.log("Backend response:", result);

        if (result && result.properties) {
          setProperties(result.properties);

          const hasActiveFilters = Object.values(initialFilters).some(
            (val) => val && val.trim() !== ""
          );

          if (hasActiveFilters) {
            applyFilters(result.properties, initialFilters);
          } else {
            setFilteredProperties(result.properties);
          }
        } else {
          setProperties([]);
          setFilteredProperties([]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle filter changes from sidebar
  const handleFilterChange = (filters) => {
    applyFilters(properties, filters);
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <LogoSpinner />
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection2 title="Our Properties" description="Discover your perfect property" image="/you.png" py="28" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">
                {filteredProperties.length} Properties Found
              </h2>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sort by: Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Size: Large to Small</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      currentPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
