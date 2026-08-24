/**
 * FreshBox - Theme Manager (Light / Dark Mode)
 * Handles persistence in localStorage and updates UI accordingly
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'freshbox_theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || THEME_LIGHT;
  }

  function setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function applyTheme(theme) {
    if (theme === THEME_DARK) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      if (document.body) {
        document.body.classList.add('dark-mode');
      }
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      if (document.body) {
        document.body.classList.remove('dark-mode');
      }
    }
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === THEME_DARK) {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Apply theme immediately to prevent white flash before DOM ready
  const initialTheme = getStoredTheme();
  if (initialTheme === THEME_DARK) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }

  // Bind event listeners on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getStoredTheme();
    applyTheme(currentTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTheme = getStoredTheme();
        const nextTheme = activeTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        setStoredTheme(nextTheme);
        applyTheme(nextTheme);

        if (window.showToast) {
          window.showToast(
            'Theme Updated',
            `Switched to ${nextTheme === THEME_DARK ? 'Dark' : 'Light'} Mode`,
            'info'
          );
        }
      });
    });
  });

  // Export globally
  window.freshboxTheme = {
    get: getStoredTheme,
    set: (t) => {
      setStoredTheme(t);
      applyTheme(t);
    }
  };
})();
