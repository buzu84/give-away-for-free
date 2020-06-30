import React from "react";
import {
  Link,
} from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
// import mySvg from '../assets/Decoration.svg';
const options = {
  duration: 1500,
  delay: 100,
  smooth: true,
}


const HomeHeader = () => {
  return (
    <div className="header" style={{height: 400}}>
      <nav className="nav_container">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <nav className="nav_container">
        <ul>
          <li>
            <Link to="/">Start</Link>
          </li>
          <li>
            <Scroll to="section1" {...options} >O co chodzi?</Scroll>
          </li>
          <li>
            <Scroll to="section2" {...options} >O nas</Scroll>
          </li>
          <li>
            <Scroll to="section3" {...options} >Fundacja i organizacje</Scroll>
          </li>
          <li>
            <Scroll to="section4" {...options} >Kontakt</Scroll>
          </li>
        </ul>
      </nav>
      <p>Zacznij pomagać</p>
      <p>Oddaj niechciane rzeczy w zaufane ręce</p>
      <img src={mySvg} alt="decoration" />
      <button>ODDAJ RZECZY</button>
      <button>ZORGANIZUJ ZBIÓRKĘ</button>
    </div>
  );
}

export default HomeHeader;
