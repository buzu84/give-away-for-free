import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyA-pG-nKPlC7XeV_G2EisY9CfAkPzk_ZDM",
  authDomain: "give-away-for-free.firebaseapp.com",
  databaseURL: "https://give-away-for-free.firebaseio.com",
  projectId: "give-away-for-free",
  storageBucket: "give-away-for-free.appspot.com",
  messagingSenderId: "685019829846",
  appId: "1:685019829846:web:11d82c423b702bbaeecdf7"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
