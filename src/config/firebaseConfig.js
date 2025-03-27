import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDif8kxDtonmn-nhWM-7kF7i1CRcreoMSM",
  authDomain: "heartbridge-dialogue-57f03.firebaseapp.com",
  projectId: "heartbridge-dialogue-57f03",
  storageBucket: "heartbridge-dialogue-57f03.firebasestorage.app",
  messagingSenderId: "520243577506",
  appId: "1:520243577506:web:8bde75e18fff519f484dfb",
  measurementId: "G-E09340HYGQ",
  databaseURL: "https://heartbridge-dialogue-57f03-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
