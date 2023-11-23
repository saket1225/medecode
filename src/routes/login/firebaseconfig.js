// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';


const firebaseConfig = {
  // Your Firebase configuration here...
  apiKey: "AIzaSyCWVjAspWQgBTlFeJrri9jjBpan9wY5sF8",
  authDomain: "latest-1ea86.firebaseapp.com",
  projectId: "latest-1ea86",
  storageBucket: "latest-1ea86.appspot.com",
  messagingSenderId: "505023670272",
  appId: "1:505023670272:web:24ec1034de27cad22810e5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = firebase.firestore(firebaseApp);

export { firebase, db, auth, signInWithPhoneNumber, RecaptchaVerifier };