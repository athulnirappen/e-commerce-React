import React from "react";

import Herosection from "./components/Herosection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import FeatureProducts from "./components/FeatureProducts";

const Home = () => {
  const data = {
    name: "E-Commerce Store",
  };
  return (
    <>
      <Herosection mydata={data} />
      <FeatureProducts />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
