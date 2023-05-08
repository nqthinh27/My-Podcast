import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCo0bQup1VXAEq4zF5r1lfonIsUpTEur9Y",
  authDomain: "mypodcast-88135.firebaseapp.com",
  projectId: "mypodcast-88135",
  storageBucket: "mypodcast-88135.appspot.com",
  messagingSenderId: "806214206620",
  appId: "1:806214206620:web:f22ed3badbebd9c1371959",
  measurementId: "G-LVHK0M2PVY"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;