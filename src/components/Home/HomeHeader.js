import React from "react";

import mySvg from '../../assets/Decoration.svg';
// import mySvgBack from '../../assets/Home-Hero-Image.jpg';
import history from './history';




const HomeHeader = () => {
  return (
    <div className="header" style={{height: 400}}>
      <div className="img_container"></div>
      <div className="flex_container">
        <p>Zacznij pomagać!</p>
        <p>Oddaj niechciane rzeczy w zaufane ręce</p>
        <img src={mySvg} alt="decoration" />
        <div className="btn_container">
          <button className="btn_give_away btn_give_away_first" onClick={() => history.push('/login')}>ODDAJ<br></br>RZECZY</button>
          <button className="btn_give_away btn_give_away_second" onClick={() => history.push('/login')}>ZORGANIZUJ<br></br>ZBIÓRKĘ</button>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
