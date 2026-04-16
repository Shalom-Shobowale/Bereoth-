import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../properties/PropertyCard";
import PropertyFilters from "../properties/PropertyFilters";
import LogoSpinner from "../LogoSpinner";
import HeroSection2 from "../home/HeroSection2";
import {
  Grid3x3,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
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
          .includes(filters.location.toLowerCase()),
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) =>
          property.type?.toLowerCase() === filters.propertyType.toLowerCase(),
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

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const sortProperties = (properties, sortType) => {
    const sorted = [...properties];
    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, "") || 0);
          const priceB = parseInt(b.price?.replace(/[^\d]/g, "") || 0);
          return priceA - priceB;
        });
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, "") || 0);
          const priceB = parseInt(b.price?.replace(/[^\d]/g, "") || 0);
          return priceB - priceA;
        });
      case "size-large":
        return sorted.sort((a, b) => {
          const sizeA = parseInt(a.size?.replace(/[^\d]/g, "") || 0);
          const sizeB = parseInt(b.size?.replace(/[^\d]/g, "") || 0);
          return sizeB - sizeA;
        });
      default:
        return sorted;
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://api.bereoth.com/api/properties?limit=1000",
        );
        const result = await response.json();

        console.log("Backend response:", result);

        if (result && result.properties) {
          setProperties(result.properties);

          const hasActiveFilters = Object.values(initialFilters).some(
            (val) => val && val.trim() !== "",
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

  const handleFilterChange = (filters) => {
    applyFilters(properties, filters);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    const sorted = sortProperties(filteredProperties, value);
    setFilteredProperties(sorted);
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <LogoSpinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection2
        title="Our Properties"
        description="Discover your perfect property"
        image="/you.png"
        py="py-28"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <PropertyFilters onFilterChange={handleFilterChange} />
            </div>
          </div>

          <div className="lg:col-span-3">
       
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-primary">
                    {filteredProperties.length}
                  </span>{" "}
                  Properties Found
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="latest">Sort by: Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="size-large">Size: Large to Small</option>
                </select>
              </div>
            </div>

            <div
              className={`grid gap-6 mb-12 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  viewMode={viewMode}
                />
              ))}
            </div>
            {currentProperties.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">
                  No properties found matching your criteria.
                </p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border transition-colors ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => paginate(pageNumber)}
                          className={`w-9 h-9 rounded-lg font-medium transition-colors ${
                            currentPage === pageNumber
                              ? "bg-primary text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span
                          key={index}
                          className="w-9 h-9 flex items-center justify-center text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-primary">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <PropertyFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
