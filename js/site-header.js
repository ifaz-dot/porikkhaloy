import { watchStudentAuth, getStudentProfile } from "./student-auth.js";
import { t, renderLangToggle } from "./i18n.js";
import { renderThemeToggle } from "./theme.js";

// Small auth-status + language + theme cluster, used in the top-right
// of every public page's header row.
export function renderSiteNavExtras(navEl) {
  const authSpan = document.createElement("span");
  const themeSpan = document.createElement("span");
  const langSpan = document.createElement("span");
  navEl.appendChild(authSpan);
  navEl.appendChild(themeSpan);
  navEl.appendChild(langSpan);

  renderThemeToggle(themeSpan);
  renderLangToggle(langSpan);

  watchStudentAuth((user) => {
    if (user) {
      authSpan.innerHTML = `<a href="profile.html" class="hint">${t("myProfile")}</a>`;
    } else {
      authSpan.innerHTML = `<a href="signup.html" class="hint">${t("signUp")}</a>`;
    }
  });
}

// Full horizontal menu bar for the main site — Classes/Exams,
// Leaderboard, and (for signed-in / paid students) My Exams and
// Courses. Call this with a container element on the pages that
// should show it (currently: index.html).
export function renderMainMenu(el) {
  const baseLinks = [
    [`index.html#subjects`, t("navClasses")],
    [`index.html#subjects`, t("navExams")],
    [`leaderboard.html`, t("navLeaderboard")],
  ];

  el.innerHTML = baseLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("");

  const myExamsLink = document.createElement("a");
  myExamsLink.href = "my-exams.html";
  myExamsLink.textContent = t("navMyExams");
  myExamsLink.style.display = "none";

  const coursesLink = document.createElement("a");
  coursesLink.href = "courses.html";
  coursesLink.textContent = t("navCourses");
  coursesLink.style.display = "none";

  el.appendChild(myExamsLink);
  el.appendChild(coursesLink);

  watchStudentAuth(async (user) => {
    if (user) {
      myExamsLink.style.display = "inline";
      const profile = await getStudentProfile(user.uid);
      coursesLink.style.display = profile?.isPaid ? "inline" : "none";
    } else {
      myExamsLink.style.display = "none";
      coursesLink.style.display = "none";
    }
  });
}
