import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVv137sU5ittFHS7i5fywomI-hT-djzuc",
  authDomain: "porikkhaloy-9bd03.firebaseapp.com",
  projectId: "porikkhaloy-9bd03",
  storageBucket: "porikkhaloy-9bd03.firebasestorage.app",
  messagingSenderId: "355902794039",
  appId: "1:355902794039:web:131a5f8ead9cfc483312b2",
  measurementId: "G-V4BFXX501C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
