// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH21QqoSoc9shWelmRSNZWzJvuBZqKdeo",
  authDomain: "csi-web-task.firebaseapp.com",
  projectId: "csi-web-task",
  storageBucket: "csi-web-task.appspot.com",
  messagingSenderId: "718463306647",
  appId: "1:718463306647:web:cbe30bb121e66aa13812d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage=getFirestore(app)

export { app, database ,storage};
