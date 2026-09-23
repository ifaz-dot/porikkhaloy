import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export function renderAdminNav(active) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      location.href = "login.html";
      return;
    }

    // BUG FIX: this used to stop at "is someone logged in?" — since the
    // public site and the admin panel share the same Firebase Auth
    // instance, a signed-in STUDENT (or an admin whose access was later
    // revoked) landing on an admin URL would previously see the full
    // admin shell rendered here, even though Firestore rules would
    // silently block their writes. Now we explicitly check the
    // `admins/{uid}` doc on every admin page load, not just at login.
    let isAdmin = false;
    try {
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      isAdmin = adminDoc.exists();
    } catch (e) {
      console.error("Admin permission check failed:", e);
    }

    if (!isAdmin) {
      await signOut(auth);
      location.href = "login.html?denied=1";
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
