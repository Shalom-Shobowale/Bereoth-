import { useState } from 'react';
import { Filter } from 'lucide-react';


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
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-28">
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
            <option value="lekki">Ibeju Lekki</option>
            <option value="atan">Atan Ota</option>
            <option value="itori">Itori Ewakoro</option>
            <option value="mowe">Mowe Ofada-mokoloki</option>
            <option value="odeda">Odeda Abeokuta</option>
            <option value="enugu">Enugu</option>
            <option value="imota">Imota-Ikorodu</option>
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
            <option value="land">Residential/Plot</option>
            <option value="acre">Residential/Acre</option>
            <option value="commercial">Commercial</option>
            <option value="farmland">Farmland</option>
            {/* <option value="commercial">Commercial</option> */}
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
             <option value="0-0.4">₦400 - ₦950k</option>
             <option value="0.45-1">₦1M - ₦2M</option>
             <option value="2-2.1">₦2.1M - ₦3M</option>
             <option value="3-3.5">₦3M - ₦5M</option>
             <option value="5-12">₦5M - ₦12M</option>
             <option value="5-12">₦12M - ₦35M</option>
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