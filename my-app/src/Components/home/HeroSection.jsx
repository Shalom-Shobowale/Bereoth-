import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    // <section className="bg-red- text-white">
    //   <div
    //     className="h-[80vh] bg-cover bg-center bg-no-repeat "
    //     style={{
    //       backgroundImage: "url('bg3.png')",
    //     }}
    //   />
    //   <div className=" ">
    //     <div className=" ">
    //       <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
    //         Affordable Land. <br />Trusted Investments. Lasting Value.
    //         {/* <span className="text-secondary">
    //           {" "}
    //           B<span className="text-primary">ER</span>EOTH
    //         </span> */}
    //       </h1>
    //       {/* <p className="text-xl md:text-2xl mb-8 text-accent">
    //         Discover premium properties, secure investments, and exceptional
    //         service in Lagos and beyond
    //       </p> */}
    //       <div className="flex flex-col sm:flex-row gap-4 justify-center">
    //         <Link
    //           to="/properties"
    //           className="bg-blue-800 hover:bg-primary text-accent px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 flex items-center justify-center space-x-2"
    //         >
    //           Explore Properties
    //           <ArrowRight className="h-5 w-5" />
    //         </Link>
    //         <button className="border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
    //           Book Site Inspection
    //         </button>
    //       </div>
    //     </div>

    //     {/* Stats */}
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    //       <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
    //         <div className="text-3xl font-bold text-accent">500+</div>
    //         <div className="text-accent">Happy Clients</div>
    //       </div>
    //       <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
    //         <div className="text-3xl font-bold text-accent">50+</div>
    //         <div className="text-accent">Properties Sold</div>
    //       </div>
    //       <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
    //         <div className="text-3xl font-bold text-accent">10+</div>
    //         <div className="text-accent">Years Experience</div>
    //       </div>
    //       <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
    //         <div className="text-3xl font-bold text-accent">100%</div>
    //         <div className="text-accent">Secure Documentation</div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="relative bg-green-500">
      <div className="flex">
        <div className="w-[50%] h-[80vh] bg-primary flex justify-center flex-col items-center">
          <h1 className="text-5xl text-white font-bold leading-tight">
            Affordable Land. <br /> Trusted Investments. <br /> Lasting Value.
          </h1>
          <div className="flex gap-4 my-9">
            <Link
              to="/properties"
              className="bg-blue-800 hover:bg-primary text-accent px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105  space-x-2 flex items-center justify-center"
            >
              Explore Properties
              <ArrowRight className="h-5 w-5" />
            </Link>

            <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Book Site Inspection
            </button>
          </div>
        </div>
        <div className="bg-[(https://mbraizinnovations.com/wp-content/uploads/2024/06/BG_slide.jpg)] bg-no-repeat bg-center bg-cover h-[80vh] w-[50%]" style={{backgroundImage: "url(https://mbraizinnovations.com/wp-content/uploads/2024/06/BG_slide.jpg)"}}></div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-[80%] absolute bottom-10">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
            <div className="text-3xl font-bold text-accent">500+</div>
            <div className="text-accent">Happy Clients</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
            <div className="text-3xl font-bold text-accent">50+</div>
            <div className="text-accent">Properties Sold</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
            <div className="text-3xl font-bold text-accent">10+</div>
            <div className="text-accent">Years Experience</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
            <div className="text-3xl font-bold text-accent">100%</div>
            <div className="text-accent">Secure Documentation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
