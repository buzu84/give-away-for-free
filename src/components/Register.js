import React, { Component } from 'react';
import history from './Home/history';
import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import mySvg from '../assets/Decoration.svg';


const Register = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h1 className="legend_label">Załóż konto: </h1>
        <img className="icon" src={mySvg} alt="decoration" />
        <fieldset className="form_field">
          <label className="form_label form_label_1">email</label>
          <input className="input_label" name="email" value={email} onChange={this.onChange} type="text" />
          <label className="form_label">Podaj hasło</label>
          <input className="input_label" name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" />
          <label className="form_label">Powtórz hasło</label>
          <input className="input_label" name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" />
        </fieldset>
        {error && <p style={{color: "red", fontSize: "0.8rem",fontWeight: "bold", marginBottom: "1rem"}} className="btn2_container">{error.message}</p>}
        <div className="btn2_container">
          <button className="btn_log register_nav" disabled={isInvalid} type="submit">Załóż konto</button>
          <button className="btn_log" onClick={() => history.push('/login')}>Zaloguj się</button>
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
