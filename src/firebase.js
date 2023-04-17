// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsI5EVPwNbVP1jtn2PAqPDMsZPhkgNGxU",
  authDomain: "blogsite-381509.firebaseapp.com",
  projectId: "blogsite-381509",
  storageBucket: "blogsite-381509.appspot.com",
  messagingSenderId: "595667223011",
  appId: "1:595667223011:web:d45e5f70137ebc81d820d6",
  measurementId: "G-MCP0Y9TZJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);


