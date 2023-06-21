import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey: "AIzaSyD_f100CLyqxzoZfENSNAO2NMerj3TpXsQ",
    authDomain: "reactproject-9d2b6.firebaseapp.com",
    projectId: "reactproject-9d2b6",
    storageBucket: "reactproject-9d2b6.appspot.com",
    messagingSenderId: "1059428638224",
    appId: "1:1059428638224:web:a23039e794130f57ecf495"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (err) {
        toast.error(err.message);
    }
};

export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Kayıt işlemi başarılı.");
        return userCredential.user;
    } catch (err) {
        toast.error(err.message);
    }
};

export const loginOut = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        toast.error(error.message);
    }
};

export const deleteCard = async (item) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'), where("name", "==", item.name));
        querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(doc(db, 'products', docSnapshot.id));
        });
    } catch (err) {
        console.error("Error deleting document: ", err);
    }
};

export { storage, storageRef, db, auth };