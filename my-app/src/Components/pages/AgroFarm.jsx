// pages/AgroFarm.jsx or components/agrofarm/AgroFarm.jsx
import { useEffect } from "react";
import AboutSection from "../Agrivest/AboutSection.jsx";
import Gallary from "../Agrivest/Gallary.jsx";

const AgroFarm = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".animate-hero");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    const message =
      "Hello!, i'm _________, I've gone through your product on the website, I will love to be a part of Bereoth AgriVest.";
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <section className="relative w-full h-[95vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed scale-105 transition-transform duration-[20s] hover:scale-110"
            style={{ backgroundImage: `url('/seven.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative w-[85%] mx-auto h-full flex items-center">
          <div className="max-w-3xl text-white">
            {/* Animated Badge */}
            <div className="animate-hero animate-slideDown">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
                Welcome to Bereoth AgriVest
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              A New Era of Wealth Creation Begins
              <span className="text-accent block mt-2 animate-hero animate-slideUp">
                Here.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-xl text-gray-200 mb-8 max-w-2xl animate-hero animate-fadeIn">
              Join Bereoth AgriVest in revolutionizing agricultural investment -
              where profitability meets purpose, and sustainability drives
              growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-hero animate-fadeInUp">
              <button onClick={handleWhatsAppClick} className="group relative px-8 py-4 bg-white hover:text-white text-primary rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <span className="relative z-10">
                  Start Investing
                </span>
                <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/20 animate-hero animate-fadeIn">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Active Investors</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$10M+</div>
                <div className="text-sm text-gray-300">Assets Managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>

        <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(15px);
          }
        }

        .animate-hero {
          opacity: 0;
        }

        .animate-in.animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-in.animate-slideUp {
          animation: slideUp 0.8s ease-out 0.2s forwards;
        }

        .animate-in.animate-fadeIn {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }

        .animate-in.animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }
      `}</style>
      </section>
      <Gallary />
      <AboutSection />
    </div>
  );
};

export default AgroFarm;
