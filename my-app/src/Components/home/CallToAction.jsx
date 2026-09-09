import { Phone, MessageCircle, Calendar, ChevronRight } from "lucide-react";

const CallToAction = () => {
  const handleWhatsAppClick = () => {
    const message =
      "Hello! I would like to inquire about your real estate services.";
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  const handleBookInspection = () => {
    const message =
      "Hello! I would like to schedule a site inspection for a property.";
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full mb-4"></div>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Don't wait for the perfect moment. Start your real estate journey
            today and let us help you secure your dream property at the best
            prices.
          </p>
        </div>

        {/* Simple 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* WhatsApp */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chat on WhatsApp
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Get instant responses to your questions
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition inline-flex items-center gap-1"
            >
              Chat Now <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Phone Call */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Call Our Experts
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Speak directly with our property consultants
            </p>
            <a
              href="tel:+2348134967650"
              className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition inline-flex items-center gap-1"
            >
              Call Now <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Site Inspection */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-all duration-300">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Book Site Inspection
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Schedule a free property tour
            </p>
            <button
              onClick={handleBookInspection}
              className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold transition inline-flex items-center gap-1"
            >
              Book Now <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Simple Offer Banner */}
        <div className="max-w-2xl mx-auto text-center pt-8">
          <p className="text-gray-500">
            <span className="font-semibold text-primary">
              Limited Time Offer:
            </span>{" "}
            Get 10% off on your first property purchase this month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
