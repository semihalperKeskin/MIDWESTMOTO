import firebase from "firebase";
import "firebase/auth"
import toast from "react-hot-toast"


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
export var storage = firebase.storage();
export var storageRef = storage.ref();
export const auth = firebase.auth();


export const loginUser = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    return user
  } catch (err) {
    toast.error(err.message)
  }
}

export const register = async (email, password) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password).then(res => toast.success("Kayıt işlemi başarılı."))
    return user;
  } catch (err) {
    toast.error(err.message)
  }
}

export const loginOut = () => {
  auth.signOut().then(() => {
    return true
  }).catch((error) => {
    toast.error(error.message)
  });
}

export const DeleteCard = (item) => {
  console.log("tem ism : ", item)
  db.collection('products').where("name", "==", item.name).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        doc.ref.delete();
    });
});
}

export default db;

