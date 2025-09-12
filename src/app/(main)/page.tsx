
import FeatureProducts from "@/components/customer-page/home/feature-products";
import Hero from "@/components/customer-page/home/hero";
import React from "react";

const HomePage = () => {
  return (
   
      <div className='flex flex-col gap-6 md:gap-12'>
        <Hero/>
        <FeatureProducts/>
      </div>
   
  );
};

export default HomePage;
