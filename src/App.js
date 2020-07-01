import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import { Link as Scroll } from 'react-scroll';
import history from './components/Home/history';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GiveAwayForm from './components/GiveAwayForm';
const options = {
  duration: 1500,
  delay: 100,
  smooth: true,
}

const App = () => {
  return (
    <Router history={history}>

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
       <Switch>
         <Route exact path='/' component={Home} />
         <Route path='/login' component={Login} />
         <Route path='/register' component={Register} />
         <Route path='/form' component={GiveAwayForm} />
       </Switch>
     </Router>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));


export default App;
