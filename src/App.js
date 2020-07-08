import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom';
import { FirebaseContext } from './components/Firebase'

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


const activeStyle = {
  border: '0.2px solid #3C3C3C',
  padding: '10px 30px',

  borderStyle: 'groove'
}


const App = () => {
  const firebase = useContext(FirebaseContext);

  const [user, setUser] = useState(null)

  useEffect(() => {
    if (firebase) {
      firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        setUser(user)
      }
    });

    }

}, [firebase])


  console.warn(user?.email)
  return (
    <Router history={history}>
      <nav className="nav_container">
        <ul className="first_nav">
          <li>
            <Link className="first_nav" to="/login">Login</Link>
          </li>
          <li>
            <Link className="first_nav register_nav" to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <nav className="nav_container">
        <ul>
          <li>
            <NavLink activeStyle={activeStyle} activeClassName="active" to="/">Start</NavLink>
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
