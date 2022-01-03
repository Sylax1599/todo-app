// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCYljmfL1OezU45JiLzCem0S_DQutBNVik",
    authDomain: "reactapp-udemy-curso.firebaseapp.com",
    projectId: "reactapp-udemy-curso",
    storageBucket: "reactapp-udemy-curso.appspot.com",
    messagingSenderId: "555406520039",
    appId: "1:555406520039:web:8b4749e480644211d33c42"
  };


const app = initializeApp(firebaseConfig);


const db = getFirestore();

//Loguearse con google
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
}