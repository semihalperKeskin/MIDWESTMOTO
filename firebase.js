import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBGJ5L6VXnzucBDqERu5ZZkzpFD4nK7ODI",
  authDomain: "reactproject-9d2b6.firebaseapp.com",
  projectId: "reactproject-9d2b6",
  storageBucket: "reactproject-9d2b6.appspot.com",
  messagingSenderId: "1059428638224",
  appId: "1:1059428638224:web:a23039e794130f57ecf495"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;

