import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const message =
      "Hello! I would like to inquire about your real estate services.";
    const url = `https://wa.me/2348134967650?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  return (
    <section className="relative">
      <div
        className="bg-no-repeat bg-center bg-cover h-[95vh] sm:h-[85vh]  md:h-screen"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg)",
        }}
      >
        <div className="md:w-[53%] h-full bg-primary clip-diagonal flex md:justify-center  flex-col md:pt-0 pt-8 items-center">
          <div className="p-3">
            <h1 className="text-4xl md:text-6xl text-white font-bold md:leading-snug leading-snug md:text-justify text-center">
              Affordable Land. <br /> Trusted Investments. <br /> Lasting Value.
            </h1>
            <div className="flex gap-5 my-9">
              <Link
                to="/properties"
                className="bg-blue-800 hover:bg-white hover:text-primary text-accent px-6 md:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105  space-x-2 flex items-center justify-center"
              >
                Explore Properties
                <ArrowRight className="h-5 w-5" />
              </Link>

              <button onClick={handleWhatsAppClick} className="border-2 border-white text-white hover:bg-white hover:text-primary md:px-8 px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Book Site Inspection
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:w-[80%] p-3 absolute bottom-10 sm:bottom-12  ">
          <div data-aos="fade-up" className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-3 md:p-6">
            <div className="text-3xl font-bold text-accent">500+</div>
            <div className="text-accent">Happy Clients</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="125" className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-3 md:p-6">
            <div className="text-3xl font-bold text-accent">50+</div>
            <div className="text-accent">Properties Sold</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="250" className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-3 md:p-6">
            <div className="text-3xl font-bold text-accent">10+</div>
            <div className="text-accent">Years Experience</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="400" className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-3 md:p-6">
            <div className="text-3xl font-bold text-accent">100%</div>
            <div className="text-accent">Secure Documentation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
