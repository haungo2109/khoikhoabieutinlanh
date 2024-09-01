import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7x5qQZxadh0c3qNiqPijr5dQKfiqFGy8",
  authDomain: "thoikhoabieutinlanh.firebaseapp.com",
  projectId: "thoikhoabieutinlanh",
  storageBucket: "thoikhoabieutinlanh.appspot.com",
  messagingSenderId: "653216162786",
  appId: "1:653216162786:web:eaa109952d9d80d6a20fbb",
  measurementId: "G-0CVL91JNHZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };