import React from "react";
import HeroSection from "../home/HeroSection";
import PropertySearch from "../home/PropertySearch";
import FeaturedProperties from "../home/FeaturedProperties.";
import WhyChooseUs from "../home/WhyChooseUs";
import Testimonials from "../home/Testimonials";
import CallToAction from "../home/CallToAction";
import Promo from "../home/Promo";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PropertySearch />
      <Promo />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
