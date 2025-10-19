import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, DollarSign, Bed } from "lucide-react";

const PropertySearch = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    minBeds: "",
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    const query = new URLSearchParams(searchData).toString();
    navigate(`/properties?${query}`);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-xl text-gray-600">
            Search through our premium collection of properties
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-primary mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <select
                  value={searchData.location}
                  onChange={(e) =>
                    setSearchData({ ...searchData, location: e.target.value })
                  }
                  className="w-full pl-10 pr-3  py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  <option value="lekki">Ibeju Lekki</option>
                  <option value="atan">Atan Ota</option>
                  <option value="itori">Itori Ewakoro</option>
                  <option value="mowe">Mowe Ofada-mokoloki</option>
                  <option value="odeda">Odeda Abeokuta</option>
                  <option value="enugu">Enugu</option>
                  <option value="imota">Imota-Ikorodu</option>
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-primary mb-2">
                Property Type
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <select
                  value={searchData.propertyType}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      propertyType: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Property Type</option>
                  <option value="land">Residential/Plot</option>
                  <option value="acre">Residential/Acre</option>
                  <option value="commercial">Commercial</option>
                  <option value="farmland">Farmland</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="relative">
              <label className="block text-sm font-medium text-primary mb-2">
                Price Range
              </label>
              <div className="relative">
                <p className="absolute left-3 top-3 h-5 w-5 text-gray-400">
                  &#8358;
                </p>
                <select
                  value={searchData.priceRange}
                  onChange={(e) =>
                    setSearchData({ ...searchData, priceRange: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Price Range</option>
                  <option value="0-0.4">₦400 - ₦950k</option>
                  <option value="0.45-1">₦1M - ₦2M</option>
                  <option value="2-2.1">₦2.1M - ₦3M</option>
                  <option value="3-3.5">₦3M - ₦5M</option>
                  <option value="5-12">₦5M - ₦12M</option>
                  <option value="5-12">₦12M - ₦35M</option>
                </select>
              </div>
            </div>

            {/* Min Beds */}
            {/* <div className="relative">
              <label className="block text-sm font-medium text-primary mb-2">
                Min Beds
              </label>
              <div className="relative">
                <Bed className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <select
                  value={searchData.minBeds}
                  onChange={(e) =>
                    setSearchData({ ...searchData, minBeds: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div> */}

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-800 hover:bg-primary text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
