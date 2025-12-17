import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LogoSpinner from "../LogoSpinner";

import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import EstateMap from "../EstateMap";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          "https://api.bereoth.com/api/properties?limit=1000"
        );
        const data = await response.json();
        const found = data.properties.find((p) => p.id === id);
        setProperty(found || null);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <LogoSpinner />;
  }

  if (!property) {
    return (
      <div className=" min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // WhatsApp contact
  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in the ${property.title} listed for ${property.price}. Can you provide more information?`;
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} for ${property.price}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Property link copied to clipboard!");
    }
  };

  // Contact form submission
  const handleContact = async (e) => {
    e.preventDefault();

    // manual validation for better UX
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setFormSubmitted(true);
    try {
      const response = await fetch("https://formspree.io/f/xandaevb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success("Your message has been sent!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong.");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <div className=" bg-white">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-6 left-6 text-accent">
          <div className="bg-primary text-accent px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
            {property.type}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {property.title}
          </h1>
          <div className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
        </div>
        <div className="absolute top-6 right-6 flex space-x-2">
          <button
            onClick={handleShare}
            className="bg-white bg-opacity-20 backdrop-blur-md text-white p-3 rounded-full hover:bg-opacity-30 transition-all"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button className="bg-white bg-opacity-20 backdrop-blur-md text-white p-3 rounded-full hover:bg-opacity-30 transition-all">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Info */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="text-3xl font-bold text-primary mb-2 md:mb-0">
                  {property.sold ? "Sold Out" : property.title}
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-1" />
                    <span>{property.size}</span>
                  </div>
                  {property.beds && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-1" />
                      <span>{property.beds} beds</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-1" />
                      <span>{property.baths} baths</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Description
              </h2>
              <div className="text-gray-600 text-lg leading-relaxed prose prose-lg max-w-none">
                {property.description?.split("\n").map((para, index) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: para.trim() }}
                  />
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Land Title / Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-primary px-3 py-2 rounded-lg text-center font-medium"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="mb-8 ">
              <h2 className="text-2xl font-bold text-primary mb-4">Location</h2>

              <EstateMap
                coordinates={property.coordinates}
                title={property.title}
                className="z-auto"
              />

              <p className="text-sm mt-2 text-gray-600">
                Showing: {property.location}
              </p>
            </div>
          </div>

          {/* Sidebar Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Interested in this property?
              </h3>

              <div className="space-y-4 mb-6">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </button>

                <a
                  href="tel:+2347068752458"
                  className="w-full bg-blue-800 hover:bg-primary text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>

                <button className="w-full bg-blue-800 hover:bg-primary text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>Book Inspection</span>
                </button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="I'm interested in this property..."
                    // defaultValue={`I'm interested in ${property.title}. Please provide more information.`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full bg-blue-800 hover:bg-primary disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  {formSubmitted ? "Sending..." : "Send Message"}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Need immediate assistance?
                </p>
                <a
                  href="tel:+2348134967650"
                  className="text-lg font-semibold text-blue-600"
                >
                  +234 813 496 7650
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
