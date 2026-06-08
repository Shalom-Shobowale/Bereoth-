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
  CheckCircle,
  Ruler,
  Home,
  Building2,
  Send,
  ArrowLeft,
} from "lucide-react";
import EstateMap from "../EstateMap";
import { Link } from "react-router-dom";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          "https://api.bereoth.com/api/properties?limit=1000",
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in the ${property.title} listed. Can you provide more information?`;
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Property link copied to clipboard!");
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          ...formData,
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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Back Button */}
        <Link
          to="/properties"
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </Link>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={handleShare}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 rounded-full transition-all duration-300"
          >
            <Share2 className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 rounded-full transition-all duration-300"
          >
            <Heart
              className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </button>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                {property.type}
              </span>
              {property.sold && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Sold Out
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-white/80 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Price Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {property.title}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {Number(property.price).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400">Starting price</p>
                </div>
              </div>
            </div>

            {/* Key Specs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Ruler className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xs text-gray-500">Size</div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {property.size}
                  </div>
                </div>
                {property.beds && (
                  <div className="text-center">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-xs text-gray-500">Bedrooms</div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {property.beds}
                    </div>
                  </div>
                )}
                {property.baths && (
                  <div className="text-center">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Bath className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-xs text-gray-500">Bathrooms</div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {property.baths}
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {property.type}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Description
              </h3>
              <div
                className="text-gray-600 text-sm leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{
                  __html: property.description?.replace(/\n/g, "<br/>"),
                }}
              />
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Land Titles & Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-lg text-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Location</h3>
              <div className="rounded-lg overflow-hidden h-64">
                <EstateMap
                  coordinates={property.coordinates}
                  title={property.title}
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {property.location}
              </p>
            </div>
          </div>

          {/* Right Column - Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Price Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-1">Starting Price</p>
                <div className="text-2xl font-bold text-primary">
                  {Number(property.price).toLocaleString()}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-3 text-center">
                  Interested in this property?
                </h3>

                <div className="space-y-2.5 mb-5">
                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </button>

                  <a
                    href="tel:+2348134967650"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>

                  <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300">
                    <Calendar className="h-4 w-4" />
                    <span>Book Inspection</span>
                  </button>
                </div>

                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-400">
                      Or send a message
                    </span>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleContact} className="space-y-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Full Name *"
                    required
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Email Address *"
                    required
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Phone Number *"
                    required
                  />
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder={`I'm interested in ${property.title}...`}
                    required
                  />
                  <button
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {formSubmitted ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">
                  Need immediate assistance?
                </p>
                <a
                  href="tel:+2348134967650"
                  className="text-base font-bold text-primary"
                >
                  +234 813 496 7650
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .description-content strong {
          font-weight: 700;
          color: #1e3a8a;
        }
        .description-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default PropertyDetailPage;
