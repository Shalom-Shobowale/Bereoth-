import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle,
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
      message,
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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "1/3 Suco Road Beside VIO Office",
        "Idi-Oparun Agege, Lagos State",
      ],
      link: null,
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 813 496 7650", "+234 813 496 7650"],
      link: "tel:+2348134967650",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@bereoth.com", "bereothp@gmail.com"],
      link: "mailto:info@bereoth.com",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 5:00 PM"],
      link: null,
    },
  ];

  return (
    <div>
      <HeroSection2
        title="Contact Us"
        description="Ready to start your real estate journey? Get in touch with our expert team today."
        image="/you.png"
        py="py-28"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Let's Talk About Your{" "}
                <span className="text-primary">Dream Property</span>
              </h2>
              <div className="w-16 h-0.5 bg-primary/30 rounded-full mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Our professional team is here to help you achieve your housing
                dreams and make the smartest real estate investments. Contact us
                today and let's bring your vision to life.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                >
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    {item.details.map((detail, i) =>
                      item.link ? (
                        <a
                          key={i}
                          href={item.link}
                          className="text-gray-600 text-sm hover:text-primary transition-colors block"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={i} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="group flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="group flex items-center justify-center gap-2 border border-primary/30 hover:bg-primary text-primary hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-500 text-sm">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <form onSubmit={handleContact} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                    Property Management
                  </option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Tell us about your requirements or questions..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                  required
                  checked={formData.tick}
                  onChange={(e) =>
                    setFormData({ ...formData, tick: e.target.checked })
                  }
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-gray-500 leading-relaxed"
                >
                  I agree to be contacted by BEREOTH Property and Investments
                  Ltd. regarding my inquiry and consent to the processing of my
                  personal data.
                </label>
              </div>

              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {formSubmitted ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Find Us Here
            </h2>
            <div className="w-12 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-3">
              Visit our office for a personal consultation
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0258477259317!2d3.3152572745538897!3d6.643712021755613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8fba5f545053%3A0x1e95f93a2e484866!2sBEREOTH%20PROPERTY%20%26%20INVESTMENTS%20LIMITED!5e0!3m2!1sen!2sng!4v1759463672698!5m2!1sen!2sng"
              className="w-full h-80 md:h-96 border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bereoth Property Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
