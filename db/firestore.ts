import firebase from "firebase/compat";
import "firebase/firestore";

const configuration = {
  apiKey: "AIzaSyD7wGnK11mL7Qgl9u22KBI48MHneu_tOXk",
  authDomain: "fir-auth-e7316.firebaseapp.com",
  projectId: "fir-auth-e7316",
  storageBucket: "fir-auth-e7316.appspot.com",
  messagingSenderId: "664651617605",
  appId: "1:664651617605:web:b59d93002db2e2714bda2c",
};

firebase.initializeApp(configuration);

const db = firebase.firestore()

export default db