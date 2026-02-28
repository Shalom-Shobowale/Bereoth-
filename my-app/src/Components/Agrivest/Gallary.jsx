import React, { useEffect, useRef } from "react";

export default function Gallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-gallery');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="md:w-[85%] mx-auto mt-16 overflow-hidden w-[85%]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* First Row */}
      <div className="flex md:flex-row flex-col gap-2 md:gap-5 mb-2 md:mb-5">
        {/* First Image - Fade In Left */}
        <div 
          className="md:w-[50%] w-full h-64 md:h-[55vh] rounded-sm bg-cover bg-no-repeat bg-center shadow-xl hover:shadow-2xl transition-all duration-700 animate-gallery animate-fadeInLeft"
          style={{ 
            backgroundImage: "url('Agrivest1.jpeg')",
            animationDelay: '100ms'
          }}
        >
          {/* Overlay on Hover */}
          <div className="w-full h-full bg-black/0 hover:bg-black/20 transition-all duration-500 flex items-end p-4">
            <span className="text-white opacity-0 hover:opacity-100 transform translate-y-4 hover:translate-y-0 transition-all duration-500 text-sm font-semibold">
              Modern Farming
            </span>
          </div>
        </div>

        {/* Second Image Container */}
        <div className="md:w-[50%] w-full">
          <div 
            className="md:w-[75%] w-full h-64 md:h-[50vh] rounded-sm bg-cover bg-no-repeat bg-center shadow-xl hover:shadow-2xl transition-all duration-700 animate-gallery animate-fadeInRight relative group"
            style={{ 
              backgroundImage: "url('Agrivest2.jpeg')",
              animationDelay: '300ms'
            }}
          >
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end p-4">
              <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-sm font-semibold">
                Green Harvest
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex md:flex-row flex-col gap-2 md:gap-5">
        {/* Third Image Container */}
        <div className="md:w-[50%] w-full flex justify-end">
          <div 
            className="md:w-[75%] w-full h-64 md:h-[50vh] rounded-sm bg-cover bg-no-repeat bg-center shadow-xl hover:shadow-2xl transition-all duration-700 animate-gallery animate-fadeInLeft relative group"
            style={{ 
              backgroundImage: "url('Agrivest3.jpeg')",
              animationDelay: '500ms'
            }}
          >
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end p-4">
              <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-sm font-semibold">
                Future of Farming
              </span>
            </div>
          </div>
        </div>

        {/* Fourth Image - Fade In Right */}
        <div 
          className="md:w-[50%] w-full h-64 md:h-[55vh] rounded-sm bg-cover bg-no-repeat bg-center shadow-xl hover:shadow-2xl transition-all duration-700 animate-gallery animate-fadeInRight relative group"
          style={{ 
            backgroundImage: "url('seven.jpg')",
            animationDelay: '700ms'
          }}
        >
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end p-4">
            <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-sm font-semibold">
              Sustainable Future
            </span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="text-center mt-8 animate-gallery animate-fadeIn" style={{ animationDelay: '900ms' }}>
        <p className="text-gray-600 text-sm md:text-base">
         Capturing the essence of modern agriculture
        </p>
      </div>

      <style>{`
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-gallery {
          opacity: 0;
        }
        
        .animate-in.animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-in.animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-in.animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        /* Hover effect for images */
        [class*="bg-cover"] {
          transition: all 0.5s ease;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        [class*="bg-cover"]:hover {
          background-size: 110%;
        }
      `}</style>
    </section>
  );
}