import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyDjocjKryMCb1y0yo4OciTjRIQkfpawDC0",
  
    authDomain: "instagram-clone-a424a.firebaseapp.com",
  
    projectId: "instagram-clone-a424a",
  
    storageBucket: "instagram-clone-a424a.appspot.com",
  
    messagingSenderId: "117649764460",
  
    appId: "1:117649764460:web:469efb4a5475d4650b2849",
  
    measurementId: "G-JNHWHN9Y4L"
  
  }; 

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();

export { db, auth };