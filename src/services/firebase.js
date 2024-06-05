// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "${process.env.REACT_APP_FIREBASE_API}",
  authDomain: "john-search-9e076.firebaseapp.com",
  projectId: "john-search-9e076",
  storageBucket: "john-search-9e076.appspot.com",
  messagingSenderId: "821117524252",
  appId: "1:821117524252:web:bd90014c8a84d8fc6042d9",
  measurementId: "G-YQC14SCYEQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { auth, db, analytics };
