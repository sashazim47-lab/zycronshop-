import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6ZkLZP03kst7Y4U4sG4Wb1ViVvYAGtI",
  authDomain: "://firebaseapp.com",
  projectId: "zycron-shop",
  storageBucket: "zycron-shop.firebasestorage.app",
  messagingSenderId: "364198789455",
  appId: "1:364198789455:web:2a9a797b1797bd7a2529ba",
  measurementId: "G-133MF45K8L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
