import React from "react";

import HomeAboutUs from "./HomeAboutUs";
import HomeContact from "./HomeContact";
import HomeFourSteps from "./HomeFourSteps";
import HomeHeader from "./HomeHeader";
import HomeOrganizations from "./HomeOrganizations";
import HomeThreeColumns from "./HomeThreeColumns";

const Home = props => {
  return (
    <div className="container">
      <HomeHeader />
      <HomeThreeColumns />
      <HomeFourSteps />
      <HomeAboutUs />
      <HomeOrganizations />
      <HomeContact authEmail={props.eMail} />
    </div>
  );
};

export default Home;
