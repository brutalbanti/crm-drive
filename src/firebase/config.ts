import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOP4pvh-DZ70ubp5y1ziCfuf6izQONmoY",
  authDomain: "crm-drive-a9fd3.firebaseapp.com",
  projectId: "crm-drive-a9fd3",
  storageBucket: "crm-drive-a9fd3.appspot.com",
  messagingSenderId: "119766645484",
  appId: "1:119766645484:web:7d31abe4a0f0ab4b24c3c9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbreal = getDatabase(app)
