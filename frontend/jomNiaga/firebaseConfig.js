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
  apiKey: "AIzaSyBOfkFv4EHubVDUdRK1nxYwIqdAKQQJreE",
  authDomain: "jomniaga-98940.firebaseapp.com",
  projectId: "jomniaga-98940",
  storageBucket: "jomniaga-98940.firebasestorage.app",
  messagingSenderId: "881039909681",
  appId: "1:881039909681:web:c56108b9b74f32801e0610",
  measurementId: "G-HL5PEHJNBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  //to retrieve and send data to firebase
const analytics = getAnalytics(app);

export { app, auth, db };