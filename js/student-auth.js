import { auth, db } from "./firebase-config.js";
import {
  GoogleAuthProvider, signInWithPopup,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, sendPasswordResetEmail,
  setPersistence, browserLocalPersistence, browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  doc, getDoc, setDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

async function ensureStudentDoc(user, defaults = {}) {
  const ref = doc(db, "students", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      name: defaults.name || user.displayName || "",
      email: user.email || "",
      cls: defaults.cls || "",
      phone: defaults.phone || "",
    });
  }
  return ref;
}

// "Remember me": local persistence survives browser restarts, session
// persistence clears when the tab/browser closes. Call this BEFORE
// signInWithEmailAndPassword / signInWithPopup, since persistence only
// applies to the sign-in call that follows it.
export async function setAuthPersistence(remember) {
  return setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}

export async function resetStudentPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function signUpWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureStudentDoc(cred.user);
  return cred.user;
}

export async function signUpWithEmail({ name, email, password, cls, phone }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await ensureStudentDoc(cred.user, { name, cls, phone });
  return cred.user;
}

export async function signInStudent(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureStudentDoc(cred.user);
  return cred.user;
}

export function watchStudentAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function getStudentProfile(uid) {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateStudentProfile(uid, data) {
  return updateDoc(doc(db, "students", uid), data);
}

export async function signOutStudent() {
  return signOut(auth);
}
