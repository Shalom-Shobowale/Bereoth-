import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    features: [],
    amenities: [],
    images: [],
    status: "Available",
    type: "land",
    size: "",
    coordinates: { lat: "", lng: "" },
  });

  const [newFeature, setNewFeature] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newAmenity, setNewAmenity] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchProperty();
    }
  }, [id, isEditing]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
      const property = response.data.property;

      setFormData({
        title: property.title,
        price: property.price?.toString() || "",
        location: property.location || "",
        description: property.description || "",
        features: property.features || [],
        amenities: property.amenities || [],
        images: property.images || [],
        status: property.status || "Available",
        type: property.type || "land",
        size: property.size || "",
        coordinates: {
          lat: property.coordinates?.lat?.toString() || "",
          lng: property.coordinates?.lng?.toString() || "",
        },
      });
    } catch (error) {
      console.error("Error fetching property:", error);
      addToast("Error loading property", "error");
      navigate("/properties");
    } finally {
      setLoading(false);
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      setFormData((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      try {
        new URL(newImageUrl.trim()); // basic URL validation
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, newImageUrl.trim()],
        }));
        setNewImageUrl("");
      } catch {
        addToast("Please enter a valid URL", "error");
      }
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.location.trim() ||
      !formData.description.trim() ||
      !formData.price
    ) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      addToast("Please enter a valid price", "error");
      return;
    }

    try {
      setSubmitLoading(true);

      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (isEditing && id) {
        await axios.put(`${API_BASE_URL}/properties/${id}`, submitData);
        addToast("Property updated successfully", "success");
      } else {
        await axios.post(`${API_BASE_URL}/properties`, submitData);
        addToast("Property created successfully", "success");
      }

      navigate("/properties");
    } catch (error) {
      console.error("Error saving property:", error);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error saving property";
      addToast(message, "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append("image", file); // Must match backend field name

    try {
      setUploadingImage(true);

      const response = await axios.post(
        `${API_BASE_URL}/upload`,
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.imageUrl;

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));

      addToast("Image uploaded successfully", "success");
    } catch (error) {
      console.error("Image upload failed:", error);
      addToast("Image upload failed", "error");
    } finally {
      setUploadingImage(false);
      e.target.value = ""; // Reset input
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/properties")}
            className="mr-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {isEditing ? "Edit Property" : "Add New Property"}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isEditing
                ? "Update property information"
                : "Create a new property listing"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow-sm rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Enter property title"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price * ($)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Enter price"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location *
              </label>
              <input
                type="text"
                name="location"
                id="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Enter property location"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description *
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Enter property description"
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
              >
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
                <option value="farmland">Farmland</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size (e.g., 450sqm)
              </label>
              <input
                type="text"
                name="size"
                id="size"
                value={formData.size}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Enter property size"
              />
            </div>

            {/* Coordinates */}
            <div>
              <label
                htmlFor="lat"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                type="text"
                name="lat"
                id="lat"
                value={formData.coordinates.lat}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Latitude"
              />
            </div>

            <div>
              <label
                htmlFor="lng"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                type="text"
                name="lng"
                id="lng"
                value={formData.coordinates.lng}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                placeholder="Longitude"
              />
            </div>

            {/* Features */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeature())
                  }
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:text-blue-600 p-3"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addAmenity())
                  }
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
                  placeholder="Add an amenity"
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:text-green-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (URLs)
              </label>
              <div className="flex gap-2 mb-3">
                {uploadingImage ? (
                  <div className="text-sm text-gray-500">Uploading...</div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="flex-1 border-gray-300 rounded-md shadow-sm  focus:ring-blue-500 focus:border-blue-500  outline-none "
                  />
                )}

                <button
                  type="button"
                  disabled={uploadingImage}
                  onClick={addImageUrl}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/200x150?text=Invalid+URL";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLoading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : null}
              {isEditing ? "Update Property" : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
