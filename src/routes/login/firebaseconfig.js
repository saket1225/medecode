// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';


const firebaseConfig = {
  // Your Firebase configuration here...
  apiKey: "AIzaSyDSqt65UqHow6mU_GbRDAfd8qYFSND_ybs",
  authDomain: "otpt-c4eed.firebaseapp.com",
  projectId: "otpt-c4eed",
  storageBucket: "otpt-c4eed.appspot.com",
  messagingSenderId: "218645364221",
  appId: "1:218645364221:web:bfe3595e993d6fc649ad94",
  measurementId: "G-6ZY3EZG5RS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = firebase.firestore(firebaseApp);

export { firebase, db, auth, signInWithPhoneNumber, RecaptchaVerifier };