// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const app = initializeApp(firebaseConfig);
export const database=getFirestore(app)
export const storage=getStorage(app);

