import React from "react";
import mySvg_1 from '../../assets/Decoration.svg';
import mySvg_2 from '../../assets/Signature.svg';


const HomeAboutUs = () => {
  return (
      <section id="section2" className="about_us info-section-3 container" style={{height: 'auto'}}>
        <div className="info-item info-item-3 row">
          <div className="info-box column">
            <h1 className="icon">O nas</h1>
            <img src={mySvg_1} alt="decoration" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper ante ut tellus sagittis, rhoncus elementum massa bibendum.
            </p>
            <div className="row">
              <div className="column"></div>
              <img src={mySvg_2} className="column" alt="signature" />
            </div>
          </div>
          <div className="pic_box column">
          </div>
        </div>
      </section>
  );
}

export default HomeAboutUs;
