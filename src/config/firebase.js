import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, child, get, push } from "firebase/database";

const firebaseConfig = {
//    Add your Api Key
};

const app = initializeApp(firebaseConfig);

export {
    app,
    getAuth,
    createUserWithEmailAndPassword,
    getDatabase,
    ref,
    set,
    signInWithEmailAndPassword,
    onValue,
    child,
    get,
    push
}