import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    tick: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleWhatsAppClick = () => {
    const message =
      "Hello! I would like to inquire about your real estate services.";
    const url = `https://wa.me/2342347068752458?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleContact = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message ||
      !formData.tick
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setFormSubmitted(true);
    try {
      const response = await fetch("https://formspree.io/f/xandaevb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          tick: formData.tick,
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
    <div>
      {/* Hero Section */}
      <section className="bg-[url('bg1.png')] bg-no-repeat bg-cover bg-center text-accent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Ready to start your real estate journey? Get in touch with our
              expert team today.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're looking to buy, sell, or invest in real estate, our
              team is here to help. Contact us through any of the channels below
              for immediate assistance.
            </p>

            <div className="space-y-8">
              {/* Office Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Office Address
                  </h3>
                  <p className="text-gray-600">
                    123 Lekki Phase 1<br />
                    Lagos State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Phone Number
                  </h3>
                  <a href="tel:+2347068752458" className="text-gray-600">
                    +234 706 875 2458
                    <br />
                    +234 706 875 2458
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Email Address
                  </h3>
                  <a href="mailto:bereothproperty.com" className="text-gray-600">
                    info@bereothproperty.com
                    <br />
                    bereothp@gmail.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Business Hours
                  </h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-12 space-y-4">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button className="bg-blue-800 hover:bg-primary text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleContact} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                >
                  <option value="">Select a subject</option>
                  <option value="buying">I want to buy a property</option>
                  <option value="selling">I want to sell my property</option>
                  <option value="investment">Investment consultation</option>
                  <option value="property-management">
                    Property management
                  </option>
                  <option value="general">General inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your requirements or questions..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 mr-3"
                  required
                  checked={formData.tick}
                  onChange={(e) =>
                    setFormData({ ...formData, tick: e.target.checked })
                  }
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to be contacted by PrimeEstate regarding my inquiry
                  and consent to the processing of my personal data for this
                  purpose.
                </label>
              </div>

              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full bg-blue-800 hover:bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
              >
                {formSubmitted ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Find Us
          </h2>
          <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-semibold">Interactive Map</p>
              <p>123 Lekki Phase 1, Lagos State, Nigeria</p>
              <p className="text-sm mt-2">
                Google Maps integration will be implemented here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
