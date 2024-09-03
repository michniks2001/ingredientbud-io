// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-p6XCs0CD1aFILG4WOFfTPf3jklf5eYA",
  authDomain: "ingredibud.firebaseapp.com",
  projectId: "ingredibud",
  storageBucket: "ingredibud.appspot.com",
  messagingSenderId: "690567220465",
  appId: "1:690567220465:web:8792b614be8d02dd906d50",
  measurementId: "G-2G1XRH93LT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
