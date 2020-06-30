import React from "react";

import HomeAboutUs from './HomeAboutUs';
import HomeContact from './HomeContact';
import HomeFourSteps from './HomeFourSteps';
import HomeHeader from './HomeHeader';
import HomeOrganizations from './HomeOrganizations';
import HomeThreeColumns from './HomeThreeColumns';

const Home = () => {
  return (
    <div className="land_page">
      <HomeHeader />
      <HomeThreeColumns />
      <HomeFourSteps />
      <HomeAboutUs />
      <HomeOrganizations />
      <HomeContact />
    </div>
  );
}

export default Home;
