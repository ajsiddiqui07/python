import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfigKeys = ['apiKey', 'projectId', 'appId'];
const missingConfig = requiredConfigKeys
  .filter((key) => !firebaseConfig[key])
  .map((key) => `VITE_FIREBASE_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`);

export const isFirebaseConfigured = missingConfig.length === 0;
export const firebaseSetupMessage = isFirebaseConfigured
  ? ''
  : `Add the missing Firebase settings to your .env file: ${missingConfig.join(', ')}.`;

let app;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
}

export const db = app ? getFirestore(app) : undefined;
