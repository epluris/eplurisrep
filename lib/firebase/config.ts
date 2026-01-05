import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsXM1WvqucxSFi51Y8i0vBzrmGMK_Zz1E",
  authDomain: "epluris-data.firebaseapp.com",
  projectId: "epluris-data",
  storageBucket: "epluris-data.firebasestorage.app",
  messagingSenderId: "262305645152",
  appId: "1:262305645152:web:b591e0ce09101616d3b905",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
