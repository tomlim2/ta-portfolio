// Language toggle — swaps text between English (default) and Korean (data-ko)
(function () {
  var lang = localStorage.getItem('lang') || 'en';

  function applyLang(l) {
    lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.setAttribute('lang', l === 'ko' ? 'ko' : 'en');

    document.querySelectorAll('[data-ko]').forEach(function (el) {
      if (l === 'ko') {
        if (!el.getAttribute('data-en')) {
          el.setAttribute('data-en', el.innerHTML);
        }
        el.innerHTML = el.getAttribute('data-ko');
      } else {
        if (el.getAttribute('data-en')) {
          el.innerHTML = el.getAttribute('data-en');
        }
      }
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

    // Update toggle button text
    document.querySelectorAll('#lang-toggle').forEach(function (btn) {
      if (l === 'ko') {
        btn.innerHTML = 'Ko / <span style="opacity:0.4">En</span>';
      } else {
        btn.innerHTML = '<span style="opacity:0.4">Ko</span> / En';
      }
    });
  }

  // Apply on load
  if (lang === 'ko') {
    document.addEventListener('DOMContentLoaded', function () {
      applyLang('ko');
    });
  }

  // Toggle handler
  document.addEventListener('click', function (e) {
    if (e.target.id === 'lang-toggle') {
      applyLang(lang === 'ko' ? 'en' : 'ko');
    }
  });
})();
