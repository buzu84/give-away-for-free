import React from "react";

import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" className="first_nav log_out_button" onClick={firebase.doSignOut}>
    Wyloguj
  </button>
);

export default withFirebase(SignOutButton);
