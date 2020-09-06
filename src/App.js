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
import LogOut from './components/LogOut';
import PwForget from './components/PwForget';
import SignOutButton from './components/SignOutButton';
import Admin from './components/Admin';
import FormSent from './components/FormSent';
import NotFound from './components/NotFound';

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.auth.onAuthStateChanged(function(user) {
        setUser(user);

        let sessionTimeout = null;
        if (user === null) {
          sessionTimeout && clearTimeout(sessionTimeout);
          sessionTimeout = null;
        } else {
          user.getIdTokenResult().then((idTokenResult) => {
            const authTime = idTokenResult.claims.auth_time * 1000;
            const sessionDuration = 1000 * 60 * 60 * 6;
            const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
            sessionTimeout = setTimeout(() => firebase.doSignOut(), millisecondsUntilExpiration);
          });
        }
    });

    return () => unsubscribe();
  }
}, [firebase, user])


  return (
    <Router history={history}>
      <nav className="nav_container">
      {user?.email === undefined ? (
        <ul className="first_nav">
          <li>
            <Link className="first_nav" to="/login">Zaloguj</Link>
          </li>
          <li>
            <Link className="first_nav register_nav" to="/register">Załóż konto</Link>
          </li>
        </ul>
      ) : (
        <ul className="first_nav">
          <li>
            <span className="first_nav logged_nav">Cześć {user?.email}</span>
          </li>
          <li>
            <Link className="first_nav logged_nav register_nav" to="/form">Oddaj rzeczy</Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      )}
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
         <Route path='/logout' component={LogOut} />
         <Route path='/form' component={GiveAwayForm} />
         <Route path='/admin' component={Admin} />
         <Route path='/pw-forget' component={PwForget} />
         <Route path='/form-sent' component={FormSent} />
         <Route component={NotFound} />
       </Switch>
     </Router>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));


export default App;
