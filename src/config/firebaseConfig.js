// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDif8kxDtonmn-nhWM-7kF7i1CRcreoMSM",
//   authDomain: "heartbridge-dialogue-57f03.firebaseapp.com",
//   projectId: "heartbridge-dialogue-57f03",
//   storageBucket: "heartbridge-dialogue-57f03.firebasestorage.app",
//   messagingSenderId: "520243577506",
//   appId: "1:520243577506:web:8bde75e18fff519f484dfb",
//   measurementId: "G-E09340HYGQ",
//   databaseURL: "https://heartbridge-dialogue-57f03-default-rtdb.firebaseio.com",
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);
// export const auth = getAuth(app);


import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDif8kxDtonmn-nhWM-7kF7i1CRcreoMSM',
  authDomain: 'heartbridge-dialogue-57f03.firebaseapp.com',
  projectId: 'heartbridge-dialogue-57f03',
  storageBucket: 'heartbridge-dialogue-57f03.appspot.com', // ✅ Fixed typo
  messagingSenderId: '520243577506',
  appId: '1:520243577506:web:8bde75e18fff519f484dfb',
  measurementId: 'G-E09340HYGQ',
  databaseURL: 'https://heartbridge-dialogue-57f03-default-rtdb.firebaseio.com', // ✅ Required for Realtime Database
}



export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app) // ✅ Correct for Realtime Database
export const auth = getAuth(app)

// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getDatabase } from 'firebase/database'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAhuMJmQCjvYkKu60cPiDO2GX3mow73Ozc',
//   authDomain: 'heart-bridge-bda94.firebaseapp.com',
//   projectId: 'heart-bridge-bda94',
//   storageBucket: 'heart-bridge-bda94.appspot.com', // ✅ Fixed
//   messagingSenderId: '469924955922',
//   appId: '1:469924955922:web:53024b38a77dde5ca415cb',
//   measurementId: 'G-L5WW5327DN',
//   databaseURL: 'https://heart-bridge-bda94-default-rtdb.firebaseio.com/',
// }

// export const app = initializeApp(firebaseConfig)
// export const db = getDatabase(app) 
// export const auth = getAuth(app)
