import React from "react";
import myPic_1 from "../../assets/Icon-1.svg";
import myPic_2 from "../../assets/Icon-2.svg";
import myPic_3 from "../../assets/Icon-3.svg";
import myPic_4 from "../../assets/Icon-4.svg";
import mySvg from "../../assets/Decoration.svg";
import { Link } from "react-router-dom";

const HomeFourSteps = (props) => {
  return (
    <section
      className="steps info-section-2 container"
      style={{ height: "auto" }}
    >
      <h1>Wystarczą 4 proste kroki</h1>
      <img className="image" src={mySvg} alt="decoration" />
      <div className="info-item info-item-2">
        <div className="info-box info-box-2">
          <div className="icon">
            <img src={myPic_1} alt="tshirt" />
          </div>
          <h2>Wybierz rzeczy</h2>
          <hr className="ruler" />
          <p>ubrania, zabawki, sprzęt i inne</p>
        </div>
        <div className="info-box info-box-2">
          <div className="icon">
            <img src={myPic_2} alt="box" />
          </div>
          <h2>Spakuj je</h2>
          <hr className="ruler" />
          <p>Skorzystaj z worków na śmieci</p>
        </div>
        <div className="info-box info-box-2">
          <div className="icon">
            <img src={myPic_3} alt="refresh" />
          </div>
          <h2>Zdecyduj komu chcesz pomóc</h2>
          <hr className="ruler" />
          <p>wybierz zaufane miejsce</p>
        </div>
        <div className="info-box info-box-2">
          <div className="icon">
            <img src={myPic_4} alt="search" />
          </div>
          <h2>Zamów kuriera</h2>
          <hr className="ruler" />
          <p>kurier przyjedzie w dogodnym terminie</p>
        </div>
      </div>
      <Link className="btn_give_away_third" to="/form">
        ODDAJ<br></br>RZECZY
      </Link>
    </section>
  );
};

export default HomeFourSteps;
