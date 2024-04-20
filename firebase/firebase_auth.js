// Import the functions you need from the SDKs you need

// import * as firebase from "firebase/app";
// import {LANDMARK_API_URL} from "@env"
import firebase from 'firebase/compat'

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { firebaseConfig } from "./firebase_config";

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()

export {auth}
