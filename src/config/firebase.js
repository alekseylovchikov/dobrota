import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBz903EQkPBktjUJ2r19W3nX5MfpzutmCs',
  authDomain: 'nice-shop.firebaseapp.com',
  databaseURL: 'https://nice-shop.firebaseio.com',
  projectId: 'nice-shop',
  storageBucket: 'gs://nice-shop.appspot.com',
  messagingSenderId: '796226410246'
};

export const firebaseApp = firebase.initializeApp(config);
