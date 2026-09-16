export function getTheme() {
  return localStorage.getItem("site_theme") || "light";
}
export function setTheme(theme) {
  localStorage.setItem("site_theme", theme);
}
export function applyTheme() {
  document.documentElement.setAttribute("data-theme", getTheme());
}
export function renderThemeToggle(el) {
  const other = getTheme() === "light" ? "dark" : "light";
  const label = getTheme() === "light" ? "🌙" : "☀️";
  el.innerHTML = `<button type="button" id="theme-toggle-btn" class="hint" style="background:none; border:none; cursor:pointer; font-size:1rem; line-height:1;" title="Toggle theme">${label}</button>`;
  document.getElementById("theme-toggle-btn").addEventListener("click", () => {
    setTheme(other);
    applyTheme();
    renderThemeToggle(el);
  });
}
