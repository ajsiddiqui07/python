import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingConfig = requiredConfigKeys
  .filter((key) => !firebaseConfig[key] || firebaseConfig[key].startsWith('your-'))
  .map((key) => `VITE_FIREBASE_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`);

export const isFirebaseConfigured = missingConfig.length === 0;
export const firebaseSetupMessage = isFirebaseConfigured
  ? ''
  : `Add the missing Firebase settings to your .env file: ${missingConfig.join(', ')}.`;

let auth;

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, { persistence: browserLocalPersistence });
}

export { auth };
