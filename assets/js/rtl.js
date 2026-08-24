/**
 * FreshBox - RTL Layout Manager
 * Handles switching between LTR and RTL directions with localStorage persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'freshbox_dir';
  const DIR_RTL = 'rtl';
  const DIR_LTR = 'ltr';

  function getStoredDir() {
    return localStorage.getItem(STORAGE_KEY) || DIR_LTR;
  }

  function setStoredDir(dir) {
    localStorage.setItem(STORAGE_KEY, dir);
  }

  function applyDir(dir) {
    if (dir === DIR_RTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      document.body.classList.add('rtl-mode');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      document.body.classList.remove('rtl-mode');
    }
    updateToggleButtons(dir);
  }

  function updateToggleButtons(dir) {
    const toggles = document.querySelectorAll('.rtl-toggle-btn');
    toggles.forEach(btn => {
      if (dir === DIR_RTL) {
        btn.classList.add('active');
        btn.setAttribute('title', 'Switch to LTR Mode');
        btn.setAttribute('aria-label', 'Switch to LTR Mode');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('title', 'RTL Mode');
        btn.setAttribute('aria-label', 'RTL Mode');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const currentDir = getStoredDir();
    applyDir(currentDir);

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeDir = getStoredDir();
        const nextDir = activeDir === DIR_RTL ? DIR_LTR : DIR_RTL;
        setStoredDir(nextDir);
        applyDir(nextDir);

        if (window.showToast) {
          window.showToast(
            'Layout Direction',
            `Switched to ${nextDir.toUpperCase()} mode`,
            'info'
          );
        }
      });
    });
  });

  window.freshboxRTL = {
    get: getStoredDir,
    set: (d) => {
      setStoredDir(d);
      applyDir(d);
    }
  };
})();
