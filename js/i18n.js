/* Lightweight site-chrome translation layer.
   Only translates fixed UI text (labels, buttons, headings) — not
   admin-entered content (subject names, questions), since that's
   the admin's own data in whatever language they typed it. */

const translations = {
  en: {
    brand: "Porikkhaloy",
    adminLogin: "Admin Login",
    signUp: "Sign up",
    myProfile: "My Profile",
    logOut: "Log out",
    backToSubjects: "← Back to subjects",
    home: "Back to homepage",

    kicker: "Free · No sign-up required · Bangla supported",
    heroLine1: "Test your preparation",
    heroLine2: "Take an exam in one click",
    heroDesc: "Take subject-wise quizzes and model tests to check your preparation. No sign-up needed — enter your name and class and start right away, or sign up to save your profile and track your history.",
    startExamBtn: "Start an exam",
    adminAddBtn: "Add questions (Admin)",
    chooseSubject: "Choose a subject",
    examRules: "Exam rules",
    examRulesText: "Each exam has a set time limit shown as a countdown. Switching tabs or leaving the app during an exam shows a warning — if you don't return in time, the exam is auto-submitted. One attempt is allowed per connection.",
    loading: "Loading…",
    noSubjects: "No subjects have been added yet.",
    footerTag: "Porikkhaloy — a quiz and exam platform for students.",

    availableExams: "Available exams",
    subjectNotFound: "Subject not found",
    duration: "Duration",
    minutes: "min",
    questions: "Questions",
    alreadyAttempted: "Already attempted",
    noExamsYet: "No exams added for this subject yet.",

    enterInfo: "Enter your info",
    fullName: "Full name",
    className: "Class",
    rollNumber: "Roll number",
    phoneNumber: "Phone number",
    startRulesText: "Once you start, the timer begins. Switching tabs or leaving the page shows a warning — if you don't return in time, the exam is auto-submitted.",
    quizNotFound: "Exam not found",
    alreadyAttemptedMsg: "You've already attempted this exam from this network. Only one attempt is allowed per connection.",
    examStartsAt: "This exam starts at",
    examClosed: "The submission window for this exam has closed.",
    signedInAs: "Signed in as",
    notYouSwitch: "Not you? Log out and start again.",

    prevQuestion: "← Previous",
    nextQuestion: "Next →",
    submitExam: "Submit exam",
    tabWarningTitle: "You left the exam!",
    tabWarningText: "Return to this tab in time or the exam will be auto-submitted.",
    examNotFound: "Exam not found.",

    completed: "Completed",
    endedEarly: "Ended early",
    endedEarlyDesc: "The exam was auto-submitted because you switched tabs.",
    yourAnswer: "Your answer:",
    correctAnswer: "Correct answer:",
    noAnswer: "Not answered",
    explanation: "Explanation:",
    correct: "Correct",
    wrong: "Wrong",
    viewLeaderboard: "View leaderboard",
    resultNotFound: "Result not found.",

    leaderboardTitle: "Leaderboard",
    leaderboardDesc: "Ranked by score. On a tie, faster submission ranks higher.",
    rank: "Rank",
    name: "Name",
    className2: "Class",
    score: "Score",
    time: "Time",
    noOneYet: "Nobody has completed this exam yet.",

    signUpTitle: "Create your account",
    signUpDesc: "Save your profile so you don't need to re-enter your info every time.",
    continueGoogle: "Continue with Google",
    or: "or",
    email: "Email",
    password: "Password",
    createAccount: "Create account",
    alreadyHaveAccount: "Already have an account?",
    logIn: "Log in",

    logInTitle: "Log in",
    noAccount: "Don't have an account?",

    profileTitle: "My Profile",
    profileDesc: "Keep your info up to date.",
    saveChanges: "Save changes",
    saved: "Saved.",

    navClasses: "Classes",
    navExams: "Exams",
    navLeaderboard: "Leaderboard",
    navMyExams: "My Exams",
    navCourses: "Courses",
    selectExamForBoard: "Select an exam to view its leaderboard",
    myExamsTitle: "My Exams",
    myExamsDesc: "Your exam history and scores.",
    noAttemptsYet: "You haven't taken any exams yet.",
    coursesTitle: "Courses",
    coursesLockedTitle: "Paid courses",
    coursesLockedDesc: "This section is available to students with an active course purchase. Contact the admin to get access.",
    coursesComingSoon: "Course content will appear here once available.",

    findResultTitle: "Find my result",
    findResultDesc: "Enter the phone number you used when taking the exam to see your results anytime.",
    searchBtn: "Search",
    noResultsFound: "No results found for that phone number.",
    viewResult: "View result",
    completeProfileFirst: "Please add your class and phone number to your profile before taking an exam.",
    goToProfile: "Go to profile",
    navFindResult: "Find Result",
    navClassesContent: "Classes",
  },
  bn: {
    brand: "পরীক্ষালয়",
    adminLogin: "অ্যাডমিন লগইন",
    signUp: "সাইন আপ",
    myProfile: "আমার প্রোফাইল",
    logOut: "লগআউট",
    backToSubjects: "← বিষয় তালিকায় ফিরে যাও",
    home: "প্রথম পাতায় ফিরে যাও",

    kicker: "বিনামূল্যে · নিবন্ধন ছাড়াই · বাংলা ভাষায়",
    heroLine1: "নিজের প্রস্তুতি যাচাই করো",
    heroLine2: "এক ক্লিকেই পরীক্ষা দাও",
    heroDesc: "বিষয়ভিত্তিক কুইজ ও মডেল টেস্ট দিয়ে নিজের প্রস্তুতি যাচাই করো। সাইন আপ লাগবে না — নাম আর ক্লাস লিখে সরাসরি শুরু করতে পারবে, অথবা সাইন আপ করে প্রোফাইল সংরক্ষণ করতে পারবে।",
    startExamBtn: "পরীক্ষা শুরু করো",
    adminAddBtn: "প্রশ্ন যোগ করবো (অ্যাডমিন)",
    chooseSubject: "বিষয় নির্বাচন করো",
    examRules: "পরীক্ষার নিয়ম",
    examRulesText: "প্রতিটি পরীক্ষায় একটি নির্দিষ্ট সময়সীমা থাকে, স্ক্রিনে কাউন্টডাউন দেখা যাবে। পরীক্ষা চলাকালীন ট্যাব পরিবর্তন করলে সতর্কবার্তা দেখানো হবে — সময়মতো না ফিরলে পরীক্ষাটি স্বয়ংক্রিয়ভাবে জমা হয়ে যাবে। প্রতিটি নেটওয়ার্ক থেকে একবারই অংশগ্রহণ করা যাবে।",
    loading: "লোড হচ্ছে…",
    noSubjects: "এখনও কোনো বিষয় যোগ করা হয়নি।",
    footerTag: "পরীক্ষালয় — শিক্ষার্থীদের জন্য একটি কুইজ ও পরীক্ষা প্ল্যাটফর্ম।",

    availableExams: "উপলব্ধ পরীক্ষাসমূহ",
    subjectNotFound: "বিষয় খুঁজে পাওয়া যায়নি",
    duration: "সময়সীমা",
    minutes: "মিনিট",
    questions: "প্রশ্ন সংখ্যা",
    alreadyAttempted: "ইতিমধ্যে অংশ নেওয়া হয়েছে",
    noExamsYet: "এই বিষয়ে এখনও কোনো পরীক্ষা যোগ করা হয়নি।",

    enterInfo: "তোমার তথ্য দাও",
    fullName: "পূর্ণ নাম",
    className: "ক্লাস",
    rollNumber: "রোল নম্বর",
    phoneNumber: "ফোন নম্বর",
    startRulesText: "শুরু করার পর টাইমার চালু হবে। ট্যাব পরিবর্তন করলে সতর্কবার্তা দেখানো হবে — সময়মতো না ফিরলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হয়ে যাবে।",
    quizNotFound: "পরীক্ষা খুঁজে পাওয়া যায়নি",
    alreadyAttemptedMsg: "এই নেটওয়ার্ক থেকে তুমি ইতিমধ্যে এই পরীক্ষায় অংশ নিয়েছ। প্রতিটি সংযোগ থেকে একবারই অংশ নেওয়া যায়।",
    examStartsAt: "এই পরীক্ষা শুরু হবে",
    examClosed: "এই পরীক্ষার জমাদানের সময় শেষ হয়ে গেছে।",
    signedInAs: "লগইন করা আছে:",
    notYouSwitch: "এটা তুমি না? লগআউট করে আবার চেষ্টা করো।",

    prevQuestion: "← আগের প্রশ্ন",
    nextQuestion: "পরের প্রশ্ন →",
    submitExam: "পরীক্ষা জমা দাও",
    tabWarningTitle: "তুমি পরীক্ষা থেকে বের হয়ে গেছ!",
    tabWarningText: "নির্ধারিত সময়ের মধ্যে এই ট্যাবে ফিরে না এলে পরীক্ষাটি স্বয়ংক্রিয়ভাবে জমা হয়ে যাবে।",
    examNotFound: "পরীক্ষা খুঁজে পাওয়া যায়নি।",

    completed: "সম্পন্ন হয়েছে",
    endedEarly: "সময়ের আগে বন্ধ হয়েছে",
    endedEarlyDesc: "ট্যাব পরিবর্তনের কারণে পরীক্ষাটি স্বয়ংক্রিয়ভাবে জমা হয়ে গেছে।",
    yourAnswer: "তোমার উত্তর:",
    correctAnswer: "সঠিক উত্তর:",
    noAnswer: "উত্তর দাওনি",
    explanation: "ব্যাখ্যা:",
    correct: "সঠিক",
    wrong: "ভুল",
    viewLeaderboard: "লিডারবোর্ড দেখো",
    resultNotFound: "ফলাফল খুঁজে পাওয়া যায়নি।",

    leaderboardTitle: "লিডারবোর্ড",
    leaderboardDesc: "স্কোর অনুযায়ী র‍্যাঙ্ক করা হয়েছে। সমান স্কোরে যে দ্রুত জমা দিয়েছে সে এগিয়ে থাকবে।",
    rank: "র‍্যাঙ্ক",
    name: "নাম",
    className2: "ক্লাস",
    score: "স্কোর",
    time: "সময়",
    noOneYet: "এখনও কেউ এই পরীক্ষা সম্পন্ন করেনি।",

    signUpTitle: "অ্যাকাউন্ট তৈরি করো",
    signUpDesc: "প্রোফাইল সংরক্ষণ করো যাতে বারবার তথ্য দিতে না হয়।",
    continueGoogle: "Google দিয়ে চালিয়ে যাও",
    or: "অথবা",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    createAccount: "অ্যাকাউন্ট তৈরি করো",
    alreadyHaveAccount: "আগে থেকেই অ্যাকাউন্ট আছে?",
    logIn: "লগইন করো",

    logInTitle: "লগইন করো",
    noAccount: "অ্যাকাউন্ট নেই?",

    profileTitle: "আমার প্রোফাইল",
    profileDesc: "তোমার তথ্য হালনাগাদ রাখো।",
    saveChanges: "পরিবর্তন সংরক্ষণ করো",
    saved: "সংরক্ষিত হয়েছে।",

    navClasses: "ক্লাস",
    navExams: "পরীক্ষা",
    navLeaderboard: "লিডারবোর্ড",
    navMyExams: "আমার পরীক্ষাসমূহ",
    navCourses: "কোর্স",
    selectExamForBoard: "লিডারবোর্ড দেখতে একটি পরীক্ষা বেছে নাও",
    myExamsTitle: "আমার পরীক্ষাসমূহ",
    myExamsDesc: "তোমার পরীক্ষার ইতিহাস ও স্কোর।",
    noAttemptsYet: "তুমি এখনও কোনো পরীক্ষা দাওনি।",
    coursesTitle: "কোর্স",
    coursesLockedTitle: "পেইড কোর্স",
    coursesLockedDesc: "এই অংশটি শুধু যেসব শিক্ষার্থী কোর্স কিনেছে তাদের জন্য উন্মুক্ত। অ্যাক্সেস পেতে অ্যাডমিনের সাথে যোগাযোগ করো।",
    coursesComingSoon: "কোর্স কনটেন্ট শীঘ্রই এখানে যুক্ত করা হবে।",

    findResultTitle: "আমার ফলাফল খুঁজো",
    findResultDesc: "পরীক্ষা দেওয়ার সময় ব্যবহৃত ফোন নম্বর দাও, যেকোনো সময় তোমার ফলাফল দেখতে পারবে।",
    searchBtn: "খুঁজো",
    noResultsFound: "এই ফোন নম্বরে কোনো ফলাফল পাওয়া যায়নি।",
    viewResult: "ফলাফল দেখো",
    completeProfileFirst: "পরীক্ষা দেওয়ার আগে তোমার প্রোফাইলে ক্লাস ও ফোন নম্বর যোগ করো।",
    goToProfile: "প্রোফাইলে যাও",
    navFindResult: "ফলাফল খুঁজো",
    navClassesContent: "ক্লাস",
  }
};

export function getLang() {
  return localStorage.getItem("site_lang") || "en";
}

export function setLang(lang) {
  localStorage.setItem("site_lang", lang);
}

export function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

export function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.documentElement.lang = getLang();
}

export function renderLangToggle(el) {
  const other = getLang() === "en" ? "bn" : "en";
  const label = getLang() === "en" ? "বাংলা" : "English";
  el.innerHTML = `<button type="button" id="lang-toggle-btn" class="hint" style="background:none; border:none; cursor:pointer; text-decoration:underline; font-family:inherit;">${label}</button>`;
  document.getElementById("lang-toggle-btn").addEventListener("click", () => {
    setLang(other);
    location.reload();
  });
}
