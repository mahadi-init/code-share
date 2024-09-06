import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.firebase_api_key as string,
  authDomain: "code-share-6563e.firebaseapp.com",
  projectId: "code-share-6563e",
  storageBucket: "code-share-6563e.appspot.com",
  messagingSenderId: "987882509476",
  appId: "1:987882509476:web:8cd255426e925250b6c231"
};

export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);