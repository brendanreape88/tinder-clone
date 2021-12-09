// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUo9pQ_kkxPRH7w_H6CW1pBIR2BeeCQ28",
  authDomain: "tinder-clone-e3120.firebaseapp.com",
  projectId: "tinder-clone-e3120",
  storageBucket: "tinder-clone-e3120.appspot.com",
  messagingSenderId: "838678235152",
  appId: "1:838678235152:web:77ae3ce7ce13b555976295",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };
