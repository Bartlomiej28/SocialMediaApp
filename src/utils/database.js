import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCg9Qf1h_4xHfCEPOOldZjvtEoJwfzoIPs",
  authDomain: "tiktokclonedatabase.firebaseapp.com",
  projectId: "tiktokclonedatabase",
  storageBucket: "tiktokclonedatabase.appspot.com",
  messagingSenderId: "792209645845",
  appId: "1:792209645845:web:749cfd07bad5ebf420c91c"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);