import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkEeV0ACxUy_c5upEd5S7PsQDWH8OBtro",
  authDomain: "journey-jotter-c808b.firebaseapp.com",
  projectId: "journey-jotter-c808b",
  storageBucket: "journey-jotter-c808b.firebasestorage.app",
  messagingSenderId: "1008923450816",
  appId: "1:1008923450816:web:94d5ea7ecd715b90b0bc25",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);