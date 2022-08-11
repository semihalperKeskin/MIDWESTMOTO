import firebase from "firebase";
import "firebase/auth"

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

export const auth = firebase.auth();


export const loginUser = async (email, password) => {
  try{
  await auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
} catch(err){
  console.log(err)
}
}

export const register = async (email, password) => {
  try{
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  return user;
} catch(err){
  console.log(err)
}
}

export default db;

