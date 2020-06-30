import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GiveAwayForm from './components/GiveAwayForm';

const App = () => {
  return (
    <HashRouter>
      <div>
         <Switch>
           <Route exact path='/' component={Home} />
           <Route path='/login' component={Login} />
           <Route path='/register' component={Register} />
           <Route path='/form' component={GiveAwayForm} />
         </Switch>
       </div>
     </HashRouter>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
