import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyATKrO1-FG87dmNEZtrN0as8aIirJXXKG4",
  authDomain: "sample-firebase-ai-app-d63c3.firebaseapp.com",
  projectId: "sample-firebase-ai-app-d63c3",
  storageBucket: "sample-firebase-ai-app-d63c3.firebasestorage.app",
  messagingSenderId: "915106528922",
  appId: "1:915106528922:web:170f65352a6b253d422923",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


export { auth, db, database, googleProvider, facebookProvider };
