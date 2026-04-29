// Theme Toggle Component

const THEME_KEY = 'cloud-native-theme';

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeToggleUI(theme);
}

function updateThemeToggleUI(theme) {
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    const icon = toggle.querySelector('.theme-icon');
    const text = toggle.querySelector('.theme-text');
    
    if (theme === 'dark') {
      icon.textContent = '☀️';
      text.textContent = 'Light Mode';
    } else {
      icon.textContent = '🌙';
      text.textContent = 'Dark Mode';
    }
  }
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}
