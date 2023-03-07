import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDl9eFSpa2UpYyGE5cFb9qWJ_DQMoHLB-8",
    authDomain: "taxishere.firebaseapp.com",
    projectId: "taxishere",
    storageBucket: "taxishere.appspot.com",
    messagingSenderId: "867347454978",
    appId: "1:867347454978:web:49960caeb0236404acdb1b",
    measurementId: "G-EDT52GCD7N"
};
  
let application; 
if (firebase.apps.length == 0) {
    const firebaseApp =firebase.initializeApp(firebaseConfig);
} else {
    const firebaseApp =firebase.app();
}

const auth = firebase.auth();
export {auth};
  
