import firebase from "firebase/compat";
import "firebase/firestore";

import { firebaseConfig } from "./firebase_config.js";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db