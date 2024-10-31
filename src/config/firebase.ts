// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0qoZiPUt8XLVciGx90Vwt_LlxSxYoH1s",
  authDomain: "moment-manager.firebaseapp.com",
  projectId: "moment-manager",
  storageBucket: "moment-manager.appspot.com",
  messagingSenderId: "362699782062",
  appId: "1:362699782062:web:375399ae5ddae86eb77a3f",
  measurementId: "G-GN8BCLREQQ"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
