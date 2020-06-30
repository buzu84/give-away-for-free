import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import history from './components/Home/history';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GiveAwayForm from './components/GiveAwayForm';

const App = () => {
  return (
    <Router history={history}>
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
