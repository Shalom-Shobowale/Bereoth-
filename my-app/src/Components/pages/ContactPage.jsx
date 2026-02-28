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
import HeroSection2 from "../home/HeroSection2";

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
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
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
        // ✅ FIXED: Reset all form fields properly
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          tick: false,
        });
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
      <HeroSection2
        title="Contact Us"
        description="Ready to start your real estate journey? Get in touch with our expert team today."
        image="/you.png" py="py-28"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our professional team is here to help you achieve your housing
              dreams and make the smartest real estate investments. Contact us
              today and let’s bring your vision to life.
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
                    1/3 Suco Road Beside VIO Office,
                    <br />
                    Idi-Oparun Agege, Lagos State.
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
                  <a href="tel:+2348134967650" className="text-gray-600">
                    +234 813 496 7650
                  </a>
                  <br />
                  <a href="tel:+2348134967650" className="text-gray-600">
                    {" "}
                    +234 813 496 7650
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
                  <a href="mailto:bereothp@gmail.com" className="text-gray-600">
                    info@bereoth.com
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
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
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
                  className="bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="bg-blue-800 hover:bg-primary text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
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
                  <option value="investment">Investment Consultation</option>
                  <option value="schedule-inspection">
                    Schedule Site Inspection
                  </option>
                  <option value="property-management">
                    Property management
                  </option>
                  <option value="partnership">Partnership Inquiry</option>
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
                  I agree to be contacted by BEREOTH property and investments
                  Ltd. regarding my inquiry and consent to the processing of my
                  personal data for this purpose.
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0258477259317!2d3.3152572745538897!3d6.643712021755613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8fba5f545053%3A0x1e95f93a2e484866!2sBEREOTH%20PROPERTY%20%26%20INVESTMENTS%20LIMITED!5e0!3m2!1sen!2sng!4v1759463672698!5m2!1sen!2sng"
            className="w-full h-96 rounded-2xl border-0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
