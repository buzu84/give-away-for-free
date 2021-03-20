import React from "react";
import mySvg_1 from "../assets/Decoration.svg";
import { Link } from "react-router-dom";

const FormSent = () => {
  return (
    <section className="info-section-4 container" style={{ height: "auto" }}>
      <div className="info-item info-item-3">
        <div className="info-box">
          <h1 className="icon">Formularz wysłany. Dziękujemy!</h1>
          <img src={mySvg_1} alt="decoration" />
          <Link className="btn_give_away_fourth" to="/">
            STRONA<br></br>GŁÓWNA
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormSent;
