import React, { Component } from 'react';
import history from './Home/history';
import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';


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

        this.props.firebase.doEmailVerification(email).then(function() {
        console.log('email sent');
        }).catch(function(error) {
        console.log('error happened');
        });
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
        <fieldset className="form_field">
          <legend>Załóż konto: </legend>
          <label>email</label>
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"/>
          <label>Podaj hasło</label>
          <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password"/>
          <label>Powtórz hasło</label>
          <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password"/>
          <button onClick={() => history.push('/login')}>zaloguj</button>
          <button disabled={isInvalid} type="submit">zarejestruj</button>
          {error && <p>{error.message}</p>}
        </fieldset>
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
