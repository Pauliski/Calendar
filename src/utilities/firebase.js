import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWtv42PjL_L6HzevXOICU11kVhqakij4k",
  authDomain: "vue-calendar-login.firebaseapp.com",
  projectId: "vue-calendar-login",
  storageBucket: "vue-calendar-login.appspot.com",
  messagingSenderId: "176080486715",
  appId: "1:176080486715:web:d5b0de813394a84071f71e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// getAuth(app);
const db = getDatabase(app);
export const chatRef = ref(db, "chats");
export default app;
