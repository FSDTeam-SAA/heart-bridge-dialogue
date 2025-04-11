import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAzCCwY054FfGVhhO1rLAAJTTY298nY67s',
//   authDomain: 'my-relationship-ai-1.firebaseapp.com',
//   projectId: 'my-relationship-ai-1',
//   storageBucket: 'my-relationship-ai-1.firebasestorage.app',
//   messagingSenderId: '621812643059',
//   appId: '1:621812643059:web:ec87d0f92b9addf424b386',
//   measurementId: 'G-T6MJJZN566',
//   databaseURL:'https://my-relationship-ai-1-default-rtdb.firebaseio.com/'
// }

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

const firebaseConfig = {
  apiKey: 'AIzaSyBcQ-b-jjAC4E5M4YospMc62fLpe4NZgIw',

  authDomain: 'myrelationshipai-12.firebaseapp.com',

  projectId: 'myrelationshipai-12',

  storageBucket: 'myrelationshipai-12.firebasestorage.app',

  messagingSenderId: '800808714483',

  appId: '1:800808714483:web:8c8d42dcb3b79b55a5b786',

  measurementId: 'G-R5G239L5KE',
  databaseURL: 'https://myrelationshipai-12-default-rtdb.firebaseio.com/',
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
