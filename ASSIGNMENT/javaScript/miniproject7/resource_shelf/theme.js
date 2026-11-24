const THEME_KEY = "shelfTheme";

export function initializeTheme(toggleButton) {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark", isDark);
  updateButton(toggleButton, isDark);

  toggleButton.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark");
    localStorage.setItem(THEME_KEY, darkModeEnabled ? "dark" : "light");
    updateButton(toggleButton, darkModeEnabled);
  });
}

function updateButton(button, isDark) {
  button.setAttribute("aria-pressed", String(isDark));
  button.querySelector("span:last-child").textContent = isDark ? "Light mode" : "Dark mode";
}
