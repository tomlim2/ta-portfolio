// Theme toggle — Light (default) / Dark
(function () {
  var theme = 'light';

  function applyTheme(t) {
    theme = t;
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update toggle button text
    document.querySelectorAll('#theme-toggle').forEach(function (btn) {
      if (t === 'dark') {
        btn.innerHTML = '<span data-theme-label="light" style="opacity:0.4">Lt</span> / <span data-theme-label="dark">Dk</span>';
      } else {
        btn.innerHTML = '<span data-theme-label="light">Lt</span> / <span data-theme-label="dark" style="opacity:0.4">Dk</span>';
      }
    });
  }

  // Apply on load
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme('light');
  });

  // Click handler — click Lt or Dk directly
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.getAttribute('data-theme-label') === 'dark') {
      applyTheme('dark');
    } else if (target.getAttribute('data-theme-label') === 'light') {
      applyTheme('light');
    } else if (target.id === 'theme-toggle') {
      applyTheme(theme === 'light' ? 'dark' : 'light');
    }
  });
})();
