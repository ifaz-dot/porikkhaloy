import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

export function renderAdminNav(active) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      location.href = "login.html";
      return;
    }
    const items = [
      ["dashboard.html", "ড্যাশবোর্ড"],
      ["questions.html", "প্রশ্ন ব্যাংক"],
      ["classes.html", "ক্লাস"],
      ["results.html", "ফলাফল ও অংশগ্রহণ"],
      ["leaderboard.html", "লিডারবোর্ড"],
      ["students.html", "শিক্ষার্থী"],
    ];
    const nav = document.getElementById("admin-nav");
    nav.innerHTML = `<a href="../index.html" class="brand"><span class="brand-bn">পরীক্ষালয়</span></a>` +
      items.map(([href, label]) =>
        `<a href="${href}" class="${href === active ? "active" : ""}">${label}</a>`
      ).join("") +
      `<a href="#" id="logout-link" style="margin-top:20px; opacity:.7;">লগআউট</a>`;

    document.getElementById("logout-link").addEventListener("click", async (e) => {
      e.preventDefault();
      await signOut(auth);
      location.href = "login.html";
    });
  });
}
