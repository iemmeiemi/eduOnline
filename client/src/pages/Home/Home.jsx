import React from "react";
import Banner from "./components/Banner";
import Search from "./components/Search";
import Introducetion from "./components/Introducetion";
import Category from "./components/Category";
import Break1 from "./components/Break1";
import BestInstructors from "./components/BestInstructors";
import PopularClass from "./components/PopularClass";

const Home = () => {
  return (
    <div >
      <Banner />
      <Search />
      <Introducetion />
      <Category />
      <Break1 />
      <BestInstructors />
      <PopularClass />
    </div>
  );
};

export default Home;
