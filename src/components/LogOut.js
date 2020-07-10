import React from "react";
import mySvg_1 from '../assets/Decoration.svg';
import history from './Home/history';

const LogOut = () => {
  return (
    <section className="info-section-4 container" style={{height: 'auto'}}>
      <div className="info-item info-item-3">
        <div className="info-box">
          <h1 className="icon">Wylogowanie nastąpiło pomyślnie!</h1>
          <img src={mySvg_1} alt="decoration" />
          <button className="btn_give_away_fourth" onClick={() => history.push('/')}>STRONA<br></br>GŁÓWNA</button>

        </div>
      </div>
    </section>
  );
}

export default LogOut;
