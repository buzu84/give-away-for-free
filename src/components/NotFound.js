import React from "react"
import mySvg from '../assets/Decoration.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="info-section-4 container" style={{height: 'auto'}}>
      <div className="info-item info-item-3">
        <div className="info-box">
          <h1 className="icon">404 - Nie znaleziono strony</h1>
          <img src={mySvg} alt="decoration" />
          <Link className="btn_give_away_fourth" to="/">STRONA<br></br>GŁÓWNA</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
