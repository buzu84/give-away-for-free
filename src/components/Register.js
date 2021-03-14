import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from './Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import mySvg from '../assets/Decoration.svg'

const Register = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
      error,
    } = this.state;

    const invalidEntry =
      password !== passwordConfirmation ||
      !password ||
      !email === '';

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h1 className="legend_label">Załóż konto: </h1>
        <img className="icon" src={mySvg} alt="decoration" />
        <fieldset className="form_field">
          <label className="form_label form_label_1">Email</label>
          <input className="input_label" name="email" value={email} onChange={this.onChange} type="text" />
          <label className="form_label">Podaj hasło</label>
          <input className="input_label" name="password" value={password} onChange={this.onChange} type="password" />
          <label className="form_label">Powtórz hasło</label>
          <input className="input_label" name="passwordConfirmation" value={passwordConfirmation} onChange={this.onChange} type="password" />
        </fieldset>
        {password !== passwordConfirmation && <p className="error_message">Hasła nie są takie same!</p>}
        {error && <p className="error_message">{error.message}</p>}
        <div className="btn2_container">
          <button className="btn_log register_nav" disabled={invalidEntry} type="submit">Załóż konto</button>
          <Link className="btn_log" to="/login">Zaloguj się</Link>
        </div>
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default Register;

export { SignUpForm };
