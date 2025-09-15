import React from "react";
import { Shield, Users, Award, Clock, MapPin, TrendingUp } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Documentation",
      description:
        "All our properties come with verified and secure documentation including C of O, Survey Plans, and proper land titles.",
    },
    {
      icon: Users,
      title: "500+ Happy Clients",
      description:
        "Join hundreds of satisfied clients who have found their dream properties through our trusted services.",
    },
    {
      icon: Award,
      title: "10+ Years Experience",
      description:
        "Over a decade of experience in the Nigerian real estate market, ensuring expert guidance and advice.",
    },
    {
      icon: Clock,
      title: "Quick Response Time",
      description:
        "Fast and efficient service delivery. We respond to all inquiries within 24 hours and provide instant support.",
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description:
        "Specializing in premium locations across Lagos with high appreciation potential and good infrastructure.",
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description:
        "Professional investment guidance to help you make informed decisions and maximize your returns.",
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
            We combine expertise, integrity, and innovation to deliver
            exceptional real estate solutions that exceed your expectations
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
