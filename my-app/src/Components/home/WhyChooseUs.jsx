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
      title: "Strategic Locations",
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
      description: "We walk with you from inspection to allocation and beyond.",
    },
    {
      icon: AudioWaveform,
      title: "Proven Track Record",
      description:
        "From 1 estate to 11 in just 6 years of consistent growth and still counting.",
    },
  ];

  return (
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with accent line */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="flex justify-center mb-4">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose Bereoth?
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            At Bereoth Property & Investments Ltd, we make land ownership
            simple, transparent, and rewarding. Here's why hundreds trust us:
          </p>
        </div>

        {/* Features Grid - Redesigned with cards and hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-primary/20"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon with new design */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/0 group-hover:bg-primary/20 rounded-b-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators - Redesigned with cards and animations */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-lg">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Our Impact in Numbers
              </h3>
              <div className="h-0.5 w-16 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center group">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative text-4xl lg:text-5xl font-bold text-primary mb-2">
                    500<span className="text-2xl">+</span>
                  </div>
                </div>
                <div className="text-gray-600 font-medium">Properties Sold</div>
                <div className="w-8 h-0.5 bg-primary/30 mx-auto mt-2 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>

              <div className="text-center group">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative text-4xl lg:text-5xl font-bold text-primary mb-2">
                    ₦50<span className="text-2xl">B+</span>
                  </div>
                </div>
                <div className="text-gray-600 font-medium">Property Value</div>
                <div className="w-8 h-0.5 bg-primary/30 mx-auto mt-2 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>

              <div className="text-center group">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative text-4xl lg:text-5xl font-bold text-primary mb-2">
                    15
                  </div>
                </div>
                <div className="text-gray-600 font-medium">
                  Locations Covered
                </div>
                <div className="w-8 h-0.5 bg-primary/30 mx-auto mt-2 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>

              <div className="text-center group">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative text-4xl lg:text-5xl font-bold text-primary mb-2">
                    98<span className="text-2xl">%</span>
                  </div>
                </div>
                <div className="text-gray-600 font-medium">
                  Client Satisfaction
                </div>
                <div className="w-8 h-0.5 bg-primary/30 mx-auto mt-2 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>
            </div>

            {/* Testimonial mini */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-primary fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </span>
                <span>Trusted by over 1,000+ happy landowners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
