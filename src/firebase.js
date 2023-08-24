import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
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