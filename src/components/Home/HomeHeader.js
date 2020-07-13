import React from "react";

import mySvg from '../../assets/Decoration.svg';
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
          <button className="btn_give_away btn_give_away_first" onClick={() => history.push('/form')}>ODDAJ<br></br>RZECZY</button>
          <button className="btn_give_away btn_give_away_second" onClick={() => history.push('/form')}>ZORGANIZUJ<br></br>ZBIÓRKĘ</button>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
