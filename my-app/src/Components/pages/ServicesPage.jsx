import React from "react";
import {
  Home,
  TrendingUp,
  Building,
  Users,
  Shield,
  MapPin,
} from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales & Marketing",
      description:
        "Comprehensive property sales services with professional marketing and nationwide reach.",
      features: [
        "Professional property photography",
        "Digital marketing campaigns",
        "Property listing on multiple platforms",
        "Market analysis and pricing strategy",
        "Negotiation and closing support",
      ],
    },
    {
      icon: TrendingUp,
      title: "Real Estate Investment Advisory",
      description:
        "Expert guidance on real estate investments to maximize your returns and minimize risks.",
      features: [
        "Market research and analysis",
        "Investment portfolio optimization",
        "ROI calculations and projections",
        "Risk assessment and mitigation",
        "Exit strategy planning",
      ],
    },
    {
      icon: Building,
      title: "Property Management",
      description:
        "Complete property management services to protect and optimize your real estate assets.",
      features: [
        "Tenant screening and placement",
        "Rent collection and accounting",
        "Property maintenance and repairs",
        "Regular property inspections",
        "24/7 emergency response",
      ],
    },
    {
      icon: MapPin,
      title: "Land Banking & Development",
      description:
        "Strategic land acquisition and development services for long-term wealth creation.",
      features: [
        "Prime location identification",
        "Due diligence and documentation",
        "Development planning and permits",
        "Infrastructure development",
        "Project management and oversight",
      ],
    },
    {
      icon: Users,
      title: "Property Consultancy",
      description:
        "Professional consulting services for all your real estate needs and decisions.",
      features: [
        "Feasibility studies",
        "Market entry strategies",
        "Property valuation services",
        "Legal documentation support",
        "Regulatory compliance assistance",
      ],
    },
    {
      icon: Shield,
      title: "Property Documentation",
      description:
        "Secure and efficient handling of all property-related documentation and legal processes.",
      features: [
        "Title verification and search",
        "Survey plan preparation",
        "Certificate of Occupancy processing",
        "Deed of Assignment preparation",
        "Perfection of property documents",
      ],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description:
        "We begin with a comprehensive consultation to understand your specific needs and objectives.",
    },
    {
      step: "02",
      title: "Market Analysis",
      description:
        "Our team conducts thorough market research and analysis to identify the best opportunities.",
    },
    {
      step: "03",
      title: "Customized Strategy",
      description:
        "We develop a tailored strategy that aligns with your goals, budget, and timeline.",
    },
    {
      step: "04",
      title: "Implementation",
      description:
        "Our experts execute the strategy with precision, keeping you informed every step of the way.",
    },
    {
      step: "05",
      title: "Ongoing Support",
      description:
        "We provide continuous support and monitoring to ensure optimal results and satisfaction.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-no-repeat bg-cover bg-center text-accent py-20"
        style={{ backgroundImage: "url(bg1.png)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to meet your unique
              needs and investment goals
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600">
              End-to-end real estate services designed to deliver exceptional
              results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              A proven methodology that ensures successful outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                100% Secure Transactions
              </h3>
              <p className="text-gray-600">
                All transactions are backed by proper documentation and legal
                verification.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our team of experienced professionals provides personalized
                attention to each client.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Proven Results
              </h3>
              <p className="text-gray-600">
                Track record of successful transactions and satisfied clients
                across Lagos State.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and discover how our
            services can help you achieve your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-800 hover:bg-primary text-accent px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Schedule Consultation
            </button>
            <a
              href="tel:+2347068752458"
              className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Call +234 706 875 2458
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
