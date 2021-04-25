import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDGpQEPoQlNYU00er6G9MjLXeJfnXsXPwg",
  authDomain: "test-33b10.firebaseapp.com",
  projectId: "test-33b10",
  storageBucket: "test-33b10.appspot.com",
  messagingSenderId: "1021976186449",
  appId: "1:1021976186449:web:9b11d9f8d2340806d4b270",
  measurementId: "G-PT2YR81S63",
});



export const auth = app.auth();
export const firestore = app.firestore();
export default app;
