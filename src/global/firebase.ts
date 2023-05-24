// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBlvd7AQEwVJi2HzWbr-9ob2UyuxTFMAYw',
  authDomain: 'document-management-syst-7b9cd.firebaseapp.com',
  projectId: 'document-management-syst-7b9cd',
  storageBucket: 'document-management-syst-7b9cd.appspot.com',
  messagingSenderId: '386688300529',
  appId: '1:386688300529:web:aa4fe3ac7cf702fdbe4050',
  measurementId: 'G-97BN4WRPHW'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()
