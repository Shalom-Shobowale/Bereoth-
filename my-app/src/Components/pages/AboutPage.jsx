import React from "react";
import {
  Users,
  Target,
  Eye,
  Award,
  TrendingUp,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency in all our dealings.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every service we provide to our valued clients.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description:
        "Our clients' satisfaction and success are at the heart of everything we do.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We embrace innovative solutions to make real estate transactions seamless.",
    },
  ];

  const team = [
    {
      name: "Adebayo Ogundimu",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "15+ years in Nigerian real estate, former investment banker",
    },
    {
      name: "Funmi Adebayo",
      role: "Head of Sales",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Expert in luxury property sales with 10+ years experience",
    },
    {
      name: "Kemi Okafor",
      role: "Legal Advisor",
      image:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Property law specialist ensuring secure transactions",
    },
    {
      name: "Tunde Bakare",
      role: "Investment Consultant",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Strategic investment advisor with proven track record",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[url('bg.png')] bg-no-repeat bg-cover bg-center text-accent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About{" "}
              <span className="text-secondary">
                {" "}
                B<span className="text-primary">ER</span>EOTH
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <p className="text-accent font-semibold text-xl">
                Bereoth Estate Development Properties
              </p>
              <p className="text-2xl font-semibold"> {">"} </p>
              <Link to="/" className="text-accent font-semibold text-xl">
                Home
              </Link>
            </div>
            {/* <p className="text-xl text-accent max-w-3xl mx-auto">
              Your trusted partner in Nigerian real estate, combining expertise,
              integrity, and innovation to deliver exceptional property
              solutions since 2013.
            </p> */}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2013, PrimeEstate emerged from a simple vision: to
                revolutionize the Nigerian real estate landscape by providing
                transparent, reliable, and customer-focused property services.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Over the past decade, we have grown from a small startup to one
                of Lagos' most trusted real estate firms, helping over 500
                families and investors find their perfect properties while
                maintaining our core values of integrity and excellence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we specialize in premium residential and commercial
                properties across Lagos State, offering comprehensive services
                from property acquisition to investment advisory.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern building"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to premium real estate opportunities in
                Nigeria by providing transparent, reliable, and innovative
                property solutions that empower our clients to achieve their
                investment goals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become Nigeria's leading real estate company, recognized for
                our integrity, innovation, and commitment to creating lasting
                value for our clients, communities, and stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                  <value.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Track Record
            </h2>
            <p className="text-xl text-blue-100">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">₦50B+</div>
              <div className="text-blue-100">Property Value Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15</div>
              <div className="text-blue-100">Prime Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
