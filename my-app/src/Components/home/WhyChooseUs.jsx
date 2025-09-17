import React from "react";
import { Shield, CreditCard, Clock, MapPin, AudioWaveform } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Documentation",
      description:
        "All our properties come with verified and authentic documentation.",
    },
    {
      icon: MapPin,
      title: "Strategic Locationss",
      description:
        "Estates sited in high-growth areas across Lagos, Ogun, and Enugu.",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Plans",
      description: "Designed to fit your budget without stress.",
    },
    {
      icon: Clock,
      title: "Customer-Centered Service",
      description: "We walk with you from inspection to allocation and beyond.",
    },
    {
      icon: AudioWaveform,
      title: "Proven Track Record",
      description:
        "From 1 estate to 11 in just 6 years of consistent growth and still counting.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose PrimeEstate?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Bereoth Property & Investments Ltd, we make land ownership
            simple, transparent, and rewarding. Here’s why hundreds trust us:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">₦50B+</div>
              <div className="text-gray-600">Property Value</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-gray-600">Locations Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
