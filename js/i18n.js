// Follow the browser language until the visitor saves an explicit choice.
(function () {
  var storageKey = 'portfolio.language';
  var preference = readPreference();

  function readPreference() {
    try {
      var saved = window.localStorage.getItem(storageKey);
      return saved === 'ko' || saved === 'en' ? saved : 'system';
    } catch (_) {
      return 'system';
    }
  }

  function systemLanguage() {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < languages.length; i++) {
      var language = languages[i].toLowerCase().split(/[-_]/)[0];
      if (language === 'ko' || language === 'en') return language;
    }
    return 'en';
  }

  function applyLang() {
    var l = preference === 'system' ? systemLanguage() : preference;
    document.documentElement.setAttribute('lang', l === 'ko' ? 'ko' : 'en');

    document.documentElement.dataset.languagePreference = preference;
    document.querySelectorAll('[data-ko]').forEach(function (el) {
      if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.innerHTML);
      var content = el.getAttribute(l === 'ko' ? 'data-ko' : 'data-en');
      if (el.innerHTML !== content) el.innerHTML = content;
    });

    // Switch fonts for Korean/English — Noto Rashi Hebrew → Noto Sans KR
    var rashiEls = document.querySelectorAll('.hero-tagline, .page-title, .card-title, .about-role, .nav-links a');
    rashiEls.forEach(function (el) {
      el.style.fontFamily = l === 'ko' ? "'Noto Sans KR', sans-serif" : "";
    });
    // Hero tagline letter-spacing
    document.querySelectorAll('.hero-tagline').forEach(function (el) {
      el.style.letterSpacing = l === 'ko' ? '-0.02rem' : '';
    });

    // Show the resolved language, including when it was detected automatically.
    document.querySelectorAll('select[data-language-select]').forEach(function (select) {
      select.value = l;
    });
  }

  document.addEventListener('change', function (event) {
    var select = event.target;
    if (!select.matches('select[data-language-select]') || select.disabled) return;
    if (['ko', 'en'].indexOf(select.value) === -1) return;
    preference = select.value;
    try {
      window.localStorage.setItem(storageKey, preference);
    } catch (_) {
      // Keep this page usable when browser storage is unavailable.
    }
    applyLang();
  });

  window.addEventListener('languagechange', function () {
    if (preference === 'system') applyLang();
  });
  window.addEventListener('storage', function (event) {
    if (event.key !== storageKey && event.key !== null) return;
    preference = readPreference();
    applyLang();
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) preference = readPreference();
    // History navigation can restore an old native select value after load.
    window.requestAnimationFrame(applyLang);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyLang);
  else applyLang();
})();
