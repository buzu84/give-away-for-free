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
  // const [isMounted, setIsMounted] = useState(false);
//   let isMounted = false;
//
//   useEffect(() => {
//     console.log(isMounted);
//     isMounted = true;
//     console.log(isMounted);
//     if (firebase && isMounted) {
//       firebase.auth.onAuthStateChanged(function(user) {
//         setUser(user);
//     });
//
//     // let userId = firebase.auth().currentUser.uid;
//
//
//   //   firebase.admin.auth().createCustomToken(user?.uid, {
//   // // Add a custom claim indicating an expiration time of 6 hours.
//   //     expiresAt: Date.now() + (1000 * 60 * 60 * 6),
//   //   })
//   //     .then((customToken) => {
//   //       // Send token back to client for authentication...
//   //     })
//   //     .catch((error) => {
//   //       console.log("Failed to create custom token:", error);
//   //     });
//
//     return () => {
//       isMounted = false;
//       console.log(isMounted);
//       // nie zmienia na false przy odmontowaniu...
//     }
//   }
// }, [firebase, isMounted])

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.auth.onAuthStateChanged(function(user) {
        setUser(user);
    });
    console.log(user?.uid);

    return () => unsubscribe();
  }
}, [firebase, user])


  return (
    <Router history={history}>
      <nav className="nav_container">
      {user?.email === undefined ? (
        <ul className="first_nav">
          <li>
            <Link className="first_nav" to="/login">Login</Link>
          </li>
          <li>
            <Link className="first_nav register_nav" to="/register">Register</Link>
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
       </Switch>
     </Router>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));


export default App;
