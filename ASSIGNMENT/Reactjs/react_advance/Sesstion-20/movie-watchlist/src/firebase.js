import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCJEjjGeMC1c-hnah0qsEoG_esrCKivBPQ",
  authDomain: "playlist-802b4.firebaseapp.com",
  projectId: "playlist-802b4",
  storageBucket: "playlist-802b4.firebasestorage.app",
  messagingSenderId: "34578726685",
  appId: "1:34578726685:web:4f7b332d9e77767267abf4",
  measurementId: "G-W50GEFYPCC"
};

const missing = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const firebaseConfigured = missing.length === 0;
export const firebaseConfigMissing = missing;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);