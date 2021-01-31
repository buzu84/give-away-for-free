import React from "react"
import mySvg from '../../assets/Decoration.svg'
import { Link } from 'react-router-dom'

const HomeHeader = () => {
  return (
    <div className="header" style={{height: 400}}>
      <div className="img_container"></div>
      <div className="flex_container">
        <p>Zacznij pomagać!</p>
        <p>Oddaj niechciane rzeczy w zaufane ręce</p>
        <img src={mySvg} alt="decoration" />
        <div className="btn_container">
          <Link className="btn_give_away btn_give_away_first" to="/form">ODDAJ<br></br>RZECZY</Link>
          <Link className="btn_give_away btn_give_away_second" to="/form">ZORGANIZUJ<br></br>ZBIÓRKĘ</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
