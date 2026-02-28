import React from "react";
import HeroSection from "../home/HeroSection";
import PropertySearch from "../home/PropertySearch";
import FeaturedProperties from "../home/FeaturedProperties.";
import WhyChooseUs from "../home/WhyChooseUs";
import Testimonials from "../home/Testimonials";
import CallToAction from "../home/CallToAction";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PropertySearch />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
