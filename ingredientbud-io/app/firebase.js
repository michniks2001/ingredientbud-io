import { initializeApp } from "firebase/app";

// Include SDKs for Firebase stuff here

const firebaseConfig = {
  apiKey: "AIzaSyA-p6XCs-CD1aFILG4WOFfTPf3jklf5eYA",
  authDomain: "ingredibud.firebase.app",
  projectId: "ingredibud",
  storageBucket: "ingredibud.appspot.com",
  messagingSenderId: "690567220465",
  appId: "1:690567220465:web:8792b614be8d02dd906d50",
  measurementId: "G-2GXRH93LT",
};

const app = initializeApp(firebaseConfig);

export { app };
