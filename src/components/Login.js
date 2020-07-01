import React, { Component } from 'react';
import history from './Home/history';
import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

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
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Zaloguj się: </legend>
          <label>email</label>
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"/>
          <label>Podaj hasło</label>
          <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password"/>
          <button onClick={() => history.push('/register')}>zarejestruj</button>
          <button disabled={isInvalid} type="submit">zaloguj</button>
          {error && <p>{error.message}</p>}
        </fieldset>
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
