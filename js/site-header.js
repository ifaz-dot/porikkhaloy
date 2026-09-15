import { watchStudentAuth } from "./student-auth.js";
import { t, renderLangToggle } from "./i18n.js";

// Renders the "Sign up / My Profile" link + language toggle into a
// given nav element. Call this on every public-facing page.
export function renderSiteNavExtras(navEl) {
  const authSpan = document.createElement("span");
  const langSpan = document.createElement("span");
  navEl.appendChild(authSpan);
  navEl.appendChild(langSpan);

  renderLangToggle(langSpan);

  watchStudentAuth((user) => {
    if (user) {
      authSpan.innerHTML = `<a href="profile.html" class="hint">${t("myProfile")}</a>`;
    } else {
      authSpan.innerHTML = `<a href="signup.html" class="hint">${t("signUp")}</a>`;
    }
  });
}
