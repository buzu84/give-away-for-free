import React, { Component } from 'react';
import history from './Home/history';
import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import mySvg from '../assets/Decoration.svg';

const Login = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h1 className="legend_label">Zaloguj się: </h1>
        <img className="icon" src={mySvg} alt="decoration" />
        <fieldset className="form_field">

          <label className="form_label form_label_1">Email</label>
          <input className="input_label" name="email" value={email} onChange={this.onChange} type="text" />
          <label className="form_label">Hasło</label>
          <input className="input_label" name="password" value={password} onChange={this.onChange} type="password" />

        </fieldset>
        {error && <p style={{color: "red", fontSize: "0.8rem",fontWeight: "bold"}} className="btn2_container">{error.message}</p>}
        <div className="btn2_container">
          <button className="btn_log" onClick={() => history.push('/register')}>Załóż konto</button>
          <button className="btn_log" disabled={isInvalid} type="submit">Zaloguj się</button>

        </div>
        <Link className="btn2_container btn_forget" to="/pw-forget">Zapomniałeś hasła?</Link>

      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export { SignInForm };

export default Login;
