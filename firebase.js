// Import the functions you need from the SDKs you need

// import * as firebase from "firebase/app";
import firebase from 'firebase/compat'

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7wGnK11mL7Qgl9u22KBI48MHneu_tOXk",
  authDomain: "fir-auth-e7316.firebaseapp.com",
  projectId: "fir-auth-e7316",
  storageBucket: "fir-auth-e7316.appspot.com",
  messagingSenderId: "664651617605",
  appId: "1:664651617605:web:b59d93002db2e2714bda2c",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()

export {auth}
 