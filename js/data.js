/*
  DATA LAYER — DEMO MODE
  ------------------------------------------------------------
  This file stands in for the backend we scoped earlier
  (Firestore for data, a Worker/Function for IP-check + timer
  validation + force-end). Right now everything runs in the
  browser with localStorage so the site works stand-alone.

  When you wire up the real backend, replace the functions in
  this file only — every page calls these functions, not
  localStorage directly, so the swap is contained here.
*/

const SUBJECTS = [
  { id: "finance", name_bn: "ফাইন্যান্স", name_en: "Finance", desc_bn: "আর্থিক বাজার ও প্রতিষ্ঠান" },
  { id: "accounting", name_bn: "হিসাববিজ্ঞান", name_en: "Accounting", desc_bn: "আর্থিক হিসাবরক্ষণ" },
  { id: "economics", name_bn: "অর্থনীতি", name_en: "Economics", desc_bn: "সামষ্টিক অর্থনীতি" },
  { id: "marketing", name_bn: "মার্কেটিং", name_en: "Marketing", desc_bn: "বিপণন নীতিমালা" },
];

const QUIZZES = [
  {
    id: "fin-mkt-01",
    subjectId: "finance",
    title_bn: "আর্থিক বাজার ও প্রতিষ্ঠান — মডেল টেস্ট ১",
    type: "exam",
    durationSeconds: 600,
    questions: [
      {
        id: "q1",
        text_bn: "নিচের কোনটি একটি আর্থিক মধ্যস্থতাকারী প্রতিষ্ঠানের উদাহরণ?",
        options_bn: ["বাণিজ্যিক ব্যাংক", "টেক্সটাইল কারখানা", "সুপারমার্কেট", "ফার্মেসি"],
        correctIndex: 0,
      },
      {
        id: "q2",
        text_bn: "প্রাইমারি মার্কেটে কী লেনদেন হয়?",
        options_bn: ["নতুন সিকিউরিটিজ ইস্যু", "পুরাতন শেয়ার বেচাকেনা", "নগদ অর্থ বিনিময়", "পণ্য ক্রয়বিক্রয়"],
        correctIndex: 0,
      },
      {
        id: "q3",
        text_bn: "কোনটি মুদ্রা বাজারের হাতিয়ার (money market instrument)?",
        options_bn: ["ট্রেজারি বিল", "কমন স্টক", "মিউচুয়াল ফান্ড", "ডিবেঞ্চার"],
        correctIndex: 0,
      },
      {
        id: "q4",
        text_bn: "কেন্দ্রীয় ব্যাংকের প্রধান কাজ কী?",
        options_bn: ["মুদ্রানীতি নিয়ন্ত্রণ", "খুচরা পণ্য বিক্রয়", "কর আদায়", "বিদ্যুৎ সরবরাহ"],
        correctIndex: 0,
      },
      {
        id: "q5",
        text_bn: "সেকেন্ডারি মার্কেটের অন্য নাম কী?",
        options_bn: ["স্টক এক্সচেঞ্জ", "পাইকারি বাজার", "কমোডিটি এক্সচেঞ্জ", "ফরেক্স ডেস্ক"],
        correctIndex: 0,
      },
    ],
  },
];

function getSubjects() { return SUBJECTS; }
function getQuizzesBySubject(subjectId) { return QUIZZES.filter(q => q.subjectId === subjectId); }
function getQuiz(quizId) { return QUIZZES.find(q => q.id === quizId); }

/* ---- attempt handling (localStorage stand-in for IP-blocked backend) ---- */

function attemptKey(quizId) { return `attempt_lock_${quizId}`; }

function hasAttempted(quizId) {
  // Real backend: server checks requester IP against /ipAttempts/{quizId}_{ip}.
  return !!localStorage.getItem(attemptKey(quizId));
}

function startAttempt(quizId, student) {
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

function getAttempt(attemptId) {
  const raw = localStorage.getItem("attempt_" + attemptId);
  return raw ? JSON.parse(raw) : null;
}

function saveAttempt(attempt) {
  localStorage.setItem("attempt_" + attempt.attemptId, JSON.stringify(attempt));
}

function finalizeAttempt(attemptId, status) {
  const attempt = getAttempt(attemptId);
  if (!attempt) return null;
  const quiz = getQuiz(attempt.quizId);
  let correct = 0;
  quiz.questions.forEach(q => {
    if (attempt.answers[q.id] === q.correctIndex) correct++;
  });
  attempt.status = status;
  attempt.score = correct;
  attempt.total = quiz.questions.length;
  attempt.endedAt = Date.now();
  saveAttempt(attempt);
  return attempt;
}
