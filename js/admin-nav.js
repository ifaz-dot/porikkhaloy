function renderAdminNav(active) {
  if (!sessionStorage.getItem("admin_session")) {
    location.href = "login.html";
    return;
  }
  const items = [
    ["dashboard.html", "ড্যাশবোর্ড"],
    ["questions.html", "প্রশ্ন ব্যাংক"],
    ["results.html", "ফলাফল ও অংশগ্রহণ"],
  ];
  const nav = document.getElementById("admin-nav");
  nav.innerHTML = `<a href="../index.html" class="brand"><span class="brand-bn">পরীক্ষালয়</span></a>` +
    items.map(([href, label]) =>
      `<a href="${href}" class="${href === active ? "active" : ""}">${label}</a>`
    ).join("") +
    `<a href="#" id="logout-link" style="margin-top:20px; opacity:.7;">লগআউট</a>`;

  document.getElementById("logout-link").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("admin_session");
    location.href = "login.html";
  });
}
