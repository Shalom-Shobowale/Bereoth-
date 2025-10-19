import { Phone, MessageCircle, Calendar } from "lucide-react";
const CallToAction = () => {
  const handleWhatsAppClick = () => {
    const message =
      "Hello! I would like to inquire about your real estate services.";
    const url = `https://wa.me/2347068752458?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Perfect Property?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Don't wait for the perfect moment. Start your real estate journey
          today and let us help you secure your dream property at the best
          prices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* WhatsApp */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition duration-300">
            <MessageCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chat on WhatsApp</h3>
            <p className="text-blue-100 mb-4">
              Get instant responses to your questions
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              Chat Now
            </button>
          </div>

          {/* Phone Call */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition duration-300">
            <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Our Experts</h3>
            <p className="text-blue-100 mb-4">
              Speak directly with our property consultants
            </p>
            <a
              href="tel:+2347068752458"
              className="bg-accent text-primary hover:bg-primary hover:text-accent px-6 py-3 rounded-lg font-bold transition inline-block text-center"
            >
              Call Now
            </a>
          </div>

          {/* Site Inspection */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition duration-300">
            <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Book Site Inspection</h3>
            <p className="text-blue-100 mb-4">Schedule a free property tour</p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-accent text-primary hover:text-accent hover:bg-primary px-6 py-3 rounded-lg font-bold transition"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 p-6 border border-blue-300 rounded-2xl bg-blue-700">
          <p className="text-lg font-semibold mb-2">🚀 Limited Time Offer!</p>
          <p className="text-blue-100">
            Get 10% off on your first property purchase this month. Terms and
            conditions apply.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
