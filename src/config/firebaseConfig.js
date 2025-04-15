// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getDatabase } from 'firebase/database'
// import { getAnalytics, isSupported } from 'firebase/analytics'

// const firebaseConfig = {
//   apiKey: 'AIzaSyDkvO7mK6MfeOW6Ozi9cIzEbMgE-QVFCRE',
//   authDomain: 'my-relationship-ai-7593b.firebaseapp.com',
//   projectId: 'my-relationship-ai-7593b',
//   storageBucket: 'my-relationship-ai-7593b.firebasestorage.app',
//   messagingSenderId: '447842556088',
//   appId: '1:447842556088:web:89a28915f09da2db4afc4d',
//   measurementId: 'G-0M7BC46GB1',
//   databaseURL:"https://my-relationship-ai-7593b-default-rtdb.firebaseio.com/",
// }

// export const app = initializeApp(firebaseConfig)
// export const db = getDatabase(app)
// export const auth = getAuth(app)

// let analytics
// isSupported().then((yes) => {
//   if (yes) {
//     analytics = getAnalytics(app)
//   }
// })

// export { app, analytics }

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDkvO7mK6MfeOW6Ozi9cIzEbMgE-QVFCRE',
  authDomain: 'my-relationship-ai-7593b.firebaseapp.com',
  projectId: 'my-relationship-ai-7593b',
  storageBucket: 'my-relationship-ai-7593b.appspot.com', 
  messagingSenderId: '447842556088',
  appId: '1:447842556088:web:89a28915f09da2db4afc4d',
  measurementId: 'G-0M7BC46GB1',
  databaseURL: 'https://my-relationship-ai-7593b-default-rtdb.firebaseio.com/',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

let analytics
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app)
  }
})

export { app, db, auth, analytics }
