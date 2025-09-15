import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';


const PropertyFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    minBeds: '',
    maxBeds: '',
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      propertyType: '',
      priceRange: '',
      minBeds: '',
      maxBeds: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Location</option>
            <option value="lekki">Lekki</option>
            <option value="ikoyi">Ikoyi</option>
            <option value="victoria-island">Victoria Island</option>
            <option value="ikorodu">Ikorodu</option>
            <option value="ajah">Ajah</option>
            <option value="epe">Epe</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Type</option>
            <option value="land">Land/Plot</option>
            <option value="apartment">Apartment</option>
            <option value="duplex">Duplex</option>
            <option value="bungalow">Bungalow</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Price</option>
            <option value="0-5">₦0 - ₦5M</option>
            <option value="5-10">₦5M - ₦10M</option>
            <option value="10-20">₦10M - ₦20M</option>
            <option value="20-50">₦20M - ₦50M</option>
            <option value="50-100">₦50M - ₦100M</option>
            <option value="100+">₦100M+</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Bedrooms
          </label>
          <select
            value={filters.minBeds}
            onChange={(e) => handleFilterChange('minBeds', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;