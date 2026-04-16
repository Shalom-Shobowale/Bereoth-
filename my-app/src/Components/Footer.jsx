import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Home,
  Building2,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpeg"
                alt="Bereoth Estate Development Project"
                className="h-12 w-12 rounded-full border-2 border-white/20"
              />
              <div>
                <span className="text-lg font-bold block">BEREOTH</span>
                <span className="text-xs text-white/70">
                  Property & Investments Ltd.
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Your trusted partner in finding the perfect property. We
              specialize in premium real estate solutions in Nigeria.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/share/1B4GoFjZfy/"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/bereothproperty?igsh=dzJ6NXB3M3pzd2hw&utm_source=ig_contact_invites&utm_medium=copy_link"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-white/50 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Properties", path: "/properties" },
                { name: "Services", path: "/services" },
                { name: "Blog", path: "/blog" },
                { name: "Partnership", path: "/partnership" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-white/50 rounded-full"></span>
              Our Services
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Property Sales", icon: Home },
                { name: "Land Banking", icon: Building2 },
                { name: "Property Management", icon: Briefcase },
                { name: "Real Estate Consultancy", icon: TrendingUp },
                { name: "Investment Advisory", icon: TrendingUp },
              ].map((service, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                  <span>{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-white/50 rounded-full"></span>
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-white/50 flex-shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm leading-relaxed">
                  1/3 Suco Road Beside VIO Office, Idi-Oparun Agege, Lagos
                  State.
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-white/50 flex-shrink-0" />
                <a
                  href="tel:+2348134967650"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  +234 813 496 7650
                </a>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-white/50 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="mailto:bereothp@gmail.com"
                    className="text-white/70 hover:text-white text-sm transition-colors block"
                  >
                    bereothp@gmail.com
                  </a>
                  <a
                    href="mailto:info@bereoth.com"
                    className="text-white/70 hover:text-white text-sm transition-colors block"
                  >
                    info@bereoth.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} BEREOTH Property and Investments
              Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <a
                href="/privacy-policy"
                className="text-white/50 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-white/50 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-white/50 hover:text-white transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
