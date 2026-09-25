// Follow the system by default; the library can override this for this visit.
(function () {
  var preference = 'system';
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme() {
    var theme = preference === 'system' ? (systemTheme.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = preference;
    document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference));
    });
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-theme-choice]');
    if (!button || !['system', 'light', 'dark'].includes(button.dataset.themeChoice)) return;
    preference = button.dataset.themeChoice;
    applyTheme();
  });

  systemTheme.addEventListener('change', function () {
    if (preference === 'system') applyTheme();
  });
  applyTheme();
})();
