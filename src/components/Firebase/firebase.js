import app from 'firebase/app';
// import firebase from "firebase/app"
import 'firebase/auth';
import 'firebase/database';
import history from '../Home/history';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut().then(function() {
      history.push('/logout')
    }).catch(function(error) {
      console.log('blad wylogowania')
    });

  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doEmailVerification = email =>
    this.auth.currentUser.sendEmailVerification(email);

  // organization = uid => this.db.ref(`data/organizacje/${uid}`);
  organizations = () => this.db.ref('data/organizacje');
  foundations = () => this.db.ref('data/fundacje');
  collections = () => this.db.ref('data/zbiorki');

}

export default Firebase;
