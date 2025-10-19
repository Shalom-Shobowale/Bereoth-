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
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="logo.jpeg"
                alt="Bereoth Estate Development Project"
                className="h-10 w-10 rounded-full"
              />
              <span className="text-lg font-bold">
                BEREOTH Property and Investments Ltd.
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner in finding the perfect property. We
              specialize in premium real estate solutions in Nigeria.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1B4GoFjZfy/"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/bereothproperty?igsh=dzJ6NXB3M3pzd2hw&utm_source=ig_contact_invites&utm_medium=copy_link"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/partnership"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Partnership
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Property Sales</li>
              <li className="text-gray-300">Land Banking</li>
              <li className="text-gray-300">Property Management</li>
              <li className="text-gray-300">Real Estate Consultancy</li>
              <li className="text-gray-300">Investment Advisory</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-9 w-9 text-blue-400" />
                <span className="text-gray-300">
                  1/3 Suco Road Beside VIO Office, Idi-Oparun Agege, Lagos
                  State.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+2347068752458" className="text-gray-300">
                  +234 706 875 2458
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <div>
                  <a href="mailto:bereothp@gmail.com" className="text-gray-300">bereothp@gmail.com</a><br />
                  <a href="mailto:info@bereoth.com" className="text-gray-300">info@bereoth.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} BEREOTH Property and Investments
            Ltd. All rights reserved. |{" "}
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
