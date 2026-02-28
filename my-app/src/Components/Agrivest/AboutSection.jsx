import { useEffect, useRef } from "react";
import Agrivest2 from "./Agrivest2";

const AboutSection = () => {
  const sectionRef = useRef(null);

  const handleWhatsAppClick = () => {
    const message = "Hello! I would like to know more about Bereoth AgriVest.";
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

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

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-[85%] mx-auto py-16 overflow-hidden">
      {/* Header with CSS Animation */}
      <div className="text-center mb-12">
        <h1
          className="relative inline-block text-4xl md:text-5xl font-bold text-primary pb-4 
                       animate-slideDown"
        >
          ABOUT SECTION
          <span
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 
                         bg-gradient-to-r from-primary to-secondary rounded-full
                         animate-expandWidth"
          ></span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6 animate-on-scroll animate-fadeInLeft">
          <div>
            <h2
              className="text-3xl lg:text-4xl font-bold text-primary mb-4 
                           hover:translate-x-2 transition-transform duration-300"
            >
              A New Era of Wealth Creation Begins
            </h2>
            <div
              className="w-20 h-1 bg-gradient-to-r from-primary to-secondary 
                          rounded-full mb-6 animate-pulse"
            ></div>
          </div>

          <div className="space-y-4 text-gray-700">
            <p
              className="text-lg leading-relaxed hover:text-primary 
                        transition-colors duration-300"
            >
              <span className="font-semibold text-primary">Bereoth</span> is
              proud to introduce{" "}
              <span className="font-semibold text-primary relative group">
                Bereoth AgriVest
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary 
                               transition-all duration-300 group-hover:w-full"
                ></span>
              </span>
              , a forward-thinking agricultural investment platform created to
              help individuals participate in agribusiness with confidence and
              peace of mind.
            </p>

            <p
              className="text-lg leading-relaxed hover:text-primary 
                        transition-colors duration-300"
            >
              By combining land assets, professional farm management, and
              strategic planning, Bereoth AgriVest offers investors a chance to
              grow wealth while contributing to food production and economic
              development.
            </p>

            <p
              className="text-lg font-semibold text-primary italic 
                        animate-pulse-slow"
            >
              This is your chance to invest in something profitable, purposeful,
              and sustainable.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleWhatsAppClick}
            className="mt-8 px-8 py-3 bg-blue-900 text-white rounded-full 
                           font-semibold shadow-lg hover:shadow-xl 
                           transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Learn More</span>
            <span
              className="absolute inset-0 bg-primary transform scale-x-0 
                           group-hover:scale-x-100 transition-transform duration-300 
                           origin-left"
            ></span>
          </button>
        </div>

        {/* Image Container */}
        <div className="relative group animate-on-scroll animate-fadeInRight">
          <div className="relative h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-[url('/seven.jpg')] bg-cover bg-center
                          transition-transform duration-700 group-hover:scale-110"
            ></div>

            {/* Overlay Gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            {/* Floating Badge */}
            <div
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm 
                          px-6 py-3 rounded-lg shadow-xl transform 
                          animate-float"
            >
              <p className="text-primary font-bold">Sustainable Farming</p>
              <p className="text-sm text-gray-600">Since 2024</p>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 
                          rounded-full blur-2xl animate-pulse"
            ></div>
          </div>
        </div>
      </div>

      <Agrivest2 />

      {/* Stats Section */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-xl shadow-lg 
                       hover:shadow-xl transition-all duration-300 
                       hover:-translate-y-2 animate-on-scroll animate-fadeInUp"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div
              className="text-3xl font-bold text-primary mb-2 
                          transition-all duration-300 hover:scale-110"
            >
              {stat.value}
            </div>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div> */}

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

        @keyframes expandWidth {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 6rem;
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-expandWidth {
          animation: expandWidth 0.8s ease-out 0.3s forwards;
          width: 0;
        }

        .animate-fadeInLeft {
          opacity: 0;
        }

        .animate-fadeInRight {
          opacity: 0;
        }

        .animate-fadeInUp {
          opacity: 0;
        }

        .animate-in.animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-in.animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-in.animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        .animate-on-scroll {
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

// const stats = [
//   { value: "500+", label: "Happy Investors" },
//   { value: "1000+", label: "Acres Farmland" },
//   { value: "95%", label: "Success Rate" },
//   { value: "24/7", label: "Support" },
// ];

export default AboutSection;
