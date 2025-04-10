import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// const firebaseConfig = {
//   apiKey: 'AIzaSyDif8kxDtonmn-nhWM-7kF7i1CRcreoMSM',
//   authDomain: 'heartbridge-dialogue-57f03.firebaseapp.com',
//   projectId: 'heartbridge-dialogue-57f03',
//   storageBucket: 'heartbridge-dialogue-57f03.appspot.com', 
//   messagingSenderId: '520243577506',
//   appId: '1:520243577506:web:8bde75e18fff519f484dfb',
//   measurementId: 'G-E09340HYGQ',
//   databaseURL: 'https://heartbridge-dialogue-57f03-default-rtdb.firebaseio.com', 
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAzCCwY054FfGVhhO1rLAAJTTY298nY67s',
  authDomain: 'my-relationship-ai-1.firebaseapp.com',
  projectId: 'my-relationship-ai-1',
  storageBucket: 'my-relationship-ai-1.firebasestorage.app',
  messagingSenderId: '621812643059',
  appId: '1:621812643059:web:ec87d0f92b9addf424b386',
  measurementId: 'G-T6MJJZN566',
  databaseURL:'https://my-relationship-ai-1-default-rtdb.firebaseio.com/'

}


export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app) 
export const auth = getAuth(app)
