// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtCrGbAXD2m8858EgdSq7NWW_uXMSLzhs",
  authDomain: "email-password-auth-27df1.firebaseapp.com",
  projectId: "email-password-auth-27df1",
  storageBucket: "email-password-auth-27df1.firebasestorage.app",
  messagingSenderId: "749879233227",
  appId: "1:749879233227:web:4f8470408f86224355e94e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);