/*
  DATA LAYER — FIRESTORE BACKED (subjects & quizzes)
  ------------------------------------------------------------
  Subjects and quizzes/questions now live in Firestore, so admin
  changes (add/remove subject, add/import questions) show up for
  every student immediately. Attempts (who took what, scores,
  IP-lock) are still localStorage-only — that part still needs a
  real backend (Worker/Function) to sync across devices, as
  scoped earlier.

  Firestore shape:
    subjects/{id}            -> { name_bn, name_en, desc_bn }
    quizzes/{id}             -> { subjectId, title_bn, type,
                                   durationSeconds, examStartAt,
                                   examEndAt,
                                   questions: [ { id, text_bn,
                                     options_bn: [...], correctIndex } ] }
*/

import { db } from "./firebase-config.js";
import {
  collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc,
  arrayUnion, query, where
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

/* ---------------- subjects ---------------- */

export async function getSubjects() {
  const snap = await getDocs(collection(db, "subjects"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getSubject(id) {
  const snap = await getDoc(doc(db, "subjects", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addSubject({ name_bn, name_en, desc_bn }) {
  return addDoc(collection(db, "subjects"), { name_bn, name_en, desc_bn });
}

export async function updateSubject(id, { name_bn, name_en, desc_bn }) {
  return updateDoc(doc(db, "subjects", id), { name_bn, name_en, desc_bn });
}

export async function deleteSubject(id) {
  // Also remove any quizzes under this subject so orphans don't linger.
  const quizzes = await getQuizzesBySubject(id);
  for (const q of quizzes) await deleteQuiz(q.id);
  return deleteDoc(doc(db, "subjects", id));
}

/* ---------------- quizzes ---------------- */

export async function getQuizzesBySubject(subjectId) {
  const q = query(collection(db, "quizzes"), where("subjectId", "==", subjectId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getAllQuizzes() {
  const snap = await getDocs(collection(db, "quizzes"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getQuiz(quizId) {
  const snap = await getDoc(doc(db, "quizzes", quizId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addQuiz({ subjectId, title_bn, type, durationSeconds, examStartAt, examEndAt }) {
  return addDoc(collection(db, "quizzes"), {
    subjectId, title_bn, type: type || "exam",
    durationSeconds: durationSeconds || 600,
    examStartAt: examStartAt || null,
    examEndAt: examEndAt || null,
    questions: []
  });
}

export async function updateQuizSchedule(quizId, { examStartAt, examEndAt }) {
  return updateDoc(doc(db, "quizzes", quizId), {
    examStartAt: examStartAt || null,
    examEndAt: examEndAt || null,
  });
}

export function getExamWindowStatus(quiz) {
  const now = Date.now();
  if (!quiz.examStartAt && !quiz.examEndAt) return "open";
  if (quiz.examStartAt && now < quiz.examStartAt) return "not_started";
  if (quiz.examEndAt && now > quiz.examEndAt) return "closed";
  return "open";
}

export async function deleteQuiz(id) {
  return deleteDoc(doc(db, "quizzes", id));
}

export async function addQuestionToQuiz(quizId, question) {
  const withId = { id: "q_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8), explanation_bn: "", ...question };
  return updateDoc(doc(db, "quizzes", quizId), { questions: arrayUnion(withId) });
}

export async function addQuestionsToQuiz(quizId, questions) {
  const withIds = questions.map((q, i) => ({
    id: "q_" + Date.now() + "_" + i + "_" + Math.random().toString(36).slice(2, 6),
    explanation_bn: "",
    ...q
  }));
  return updateDoc(doc(db, "quizzes", quizId), { questions: arrayUnion(...withIds) });
}

export async function updateQuestionInQuiz(quizId, questionId, updatedFields) {
  const quiz = await getQuiz(quizId);
  if (!quiz) return;
  const questions = (quiz.questions || []).map(q =>
    q.id === questionId ? { ...q, ...updatedFields } : q
  );
  return updateDoc(doc(db, "quizzes", quizId), { questions });
}

export async function deleteQuestionFromQuiz(quizId, questionId) {
  const quiz = await getQuiz(quizId);
  if (!quiz) return;
  const questions = (quiz.questions || []).filter(q => q.id !== questionId);
  return updateDoc(doc(db, "quizzes", quizId), { questions });
}

export async function getAttemptByFirestoreId(id) {
  const snap = await getDoc(doc(db, "attempts", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getAttemptsByPhone(phone) {
  const q = query(collection(db, "attempts"), where("student.phone", "==", phone));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(a => a.score !== undefined)
    .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));
}

/* ---------------- classes (YouTube / linked video content) ---------------- */

export async function getClassesBySubject(subjectId) {
  const q = query(collection(db, "classes"), where("subjectId", "==", subjectId));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export async function getAllClasses() {
  const snap = await getDocs(collection(db, "classes"));
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export async function addClass({ subjectId, title_bn, url }) {
  return addDoc(collection(db, "classes"), { subjectId, title_bn, url, createdAt: Date.now() });
}

export async function deleteClass(id) {
  return deleteDoc(doc(db, "classes", id));
}

// Turns a pasted URL (YouTube, Google Drive, or a direct video file link)
// into embeddable player HTML. No file upload involved — admin pastes a
// link to content hosted elsewhere (YouTube, Drive, etc.), which keeps
// this free (real file hosting needs paid storage).
export function renderVideoEmbed(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) {
    return `<iframe width="100%" height="360" src="https://www.youtube.com/embed/${yt[1]}" title="class video" frameborder="0" allowfullscreen style="border-radius:var(--radius); background:#000;"></iframe>`;
  }
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) {
    return `<iframe width="100%" height="360" src="https://drive.google.com/file/d/${drive[1]}/preview" allowfullscreen style="border-radius:var(--radius); background:#000;"></iframe>`;
  }
  // Fallback: assume a direct video file URL (.mp4 etc.)
  return `<video controls style="width:100%; max-height:420px; border-radius:var(--radius); background:#000;"><source src="${url}"></video>`;
}

/* ---- CSV import helper ----
   Expected format per line, comma-separated, no header needed:
   প্রশ্ন,অপশন১,অপশন২,অপশন৩,অপশন৪,সঠিক_ইনডেক্স(０-৩),ব্যাখ্যা(ঐচ্ছিক)
   Commas inside a field should be wrapped in double quotes: "...,..."
*/
export function parseQuestionCSV(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const rows = lines.map(line => {
    const cells = [];
    let cur = "", inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { cells.push(cur); cur = ""; continue; }
      cur += ch;
    }
    cells.push(cur);
    return cells.map(c => c.trim());
  });

  return rows
    .filter(r => r.length >= 6)
    .map(r => ({
      text_bn: r[0],
      options_bn: [r[1], r[2], r[3], r[4]],
      correctIndex: Math.max(0, Math.min(3, parseInt(r[5], 10) || 0)),
      explanation_bn: r[6] || "",
    }));
}

/* ---------------- attempts (Firestore — shared across all devices) ---------------- */

export async function submitAttemptToCloud(attempt) {
  return addDoc(collection(db, "attempts"), {
    attemptId: attempt.attemptId,
    quizId: attempt.quizId,
    student: attempt.student,
    answers: attempt.answers,
    status: attempt.status,
    score: attempt.score,
    total: attempt.total,
    startedAt: attempt.startedAt,
    endedAt: attempt.endedAt,
  });
}

export async function getAllAttempts() {
  const snap = await getDocs(collection(db, "attempts"));
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));
}

export async function updateAttempt(id, updatedFields) {
  return updateDoc(doc(db, "attempts", id), updatedFields);
}

export async function deleteAttempt(id) {
  return deleteDoc(doc(db, "attempts", id));
}

export async function getLeaderboard(quizId) {
  const q = query(collection(db, "attempts"), where("quizId", "==", quizId));
  const snap = await getDocs(q);
  const attempts = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(a => a.score !== undefined && a.endedAt && a.startedAt);

  return attempts
    .map(a => ({ ...a, durationSeconds: Math.round((a.endedAt - a.startedAt) / 1000) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;       // higher score first
      return a.durationSeconds - b.durationSeconds;              // then faster submission first
    });
}

/* ---------------- attempt handling (localStorage — per-device IP-lock only) ---------------- */

function attemptKey(quizId) { return `attempt_lock_${quizId}`; }

export function hasAttempted(quizId) {
  // Real backend: server checks requester IP against /ipAttempts/{quizId}_{ip}.
  return !!localStorage.getItem(attemptKey(quizId));
}

export function startAttempt(quizId, student) {
  const attemptId = "a_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
  const record = {
    attemptId, quizId, student,
    startedAt: Date.now(),
    status: "in-progress",
    answers: {},
  };
  localStorage.setItem(attemptKey(quizId), attemptId);
  localStorage.setItem("attempt_" + attemptId, JSON.stringify(record));
  return attemptId;
}

export function getAttempt(attemptId) {
  const raw = localStorage.getItem("attempt_" + attemptId);
  return raw ? JSON.parse(raw) : null;
}

export function saveAttempt(attempt) {
  localStorage.setItem("attempt_" + attempt.attemptId, JSON.stringify(attempt));
}

export async function finalizeAttempt(attemptId, status) {
  const attempt = getAttempt(attemptId);
  if (!attempt) return null;
  const quiz = await getQuiz(attempt.quizId);
  let correct = 0;
  quiz.questions.forEach(q => {
    if (attempt.answers[q.id] === q.correctIndex) correct++;
  });
  attempt.status = status;
  attempt.score = correct;
  attempt.total = quiz.questions.length;
  attempt.endedAt = Date.now();
  saveAttempt(attempt);
  try {
    await submitAttemptToCloud(attempt);
  } catch (e) {
    // If this fails (offline, rules issue), the attempt still exists
    // locally and result.html can still show the student their score.
    console.error("Could not sync attempt to Firestore:", e);
  }
  return attempt;
}
