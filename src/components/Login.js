import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from './Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import mySvg from '../assets/Decoration.svg'

const Login = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, password, error } = this.state;
    const blankEmailPassword = password === "" || email === "";
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h1 className="legend_label">Zaloguj się: </h1>
        <img className="icon" src={mySvg} alt="decoration" />
        <fieldset className="form_field">
          <label className="form_label form_label_1">Email</label>
          <input
            className="input_label"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
          />
          <label className="form_label">Hasło</label>
          <input
            className="input_label"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
          />
        </fieldset>
        {error && <p className="error_message">{error.message}</p>}
        <div className="btn2_container">
          <button className="btn_log register_nav" disabled={blankEmailPassword} type="submit">Zaloguj się</button>
          <Link className="btn_log" to="/register">Załóż konto</Link>
        </div>
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export { SignInForm };

export default Login;
