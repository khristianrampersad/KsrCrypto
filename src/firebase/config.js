import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyPt9VR_S5xCTVDwT68fFgMBe1dxh4ClA",
  authDomain: "cryptoproject-a3c37.firebaseapp.com",
  projectId: "cryptoproject-a3c37",
  storageBucket: "cryptoproject-a3c37.firebasestorage.app",
  messagingSenderId: "95017423466",
  appId: "1:95017423466:web:a9b0c26f83f6ecedf2b013",
  measurementId: "G-JYZGQ942RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app; 