// Follow the browser language until the visitor saves an explicit choice.
(function () {
  var storageKey = 'portfolio.language';
  var preference = readPreference();
  var switchers = [];

  function closeSwitcher(switcher, restoreFocus) {
    switcher.menu.hidden = true;
    switcher.root.classList.remove('is-open');
    switcher.button.setAttribute('aria-expanded', 'false');
    if (restoreFocus) switcher.button.focus({ preventScroll: true });
  }

  function openSwitcher(switcher) {
    switchers.forEach(function (other) {
      if (other !== switcher) closeSwitcher(other, false);
    });
    switcher.menu.hidden = false;
    switcher.root.classList.add('is-open');
    switcher.button.setAttribute('aria-expanded', 'true');
    var selected = switcher.options.find(function (option) {
      return option.dataset.language === switcher.select.value;
    });
    (selected || switcher.options[0]).focus({ preventScroll: true });
  }

  function initSwitchers() {
    document.querySelectorAll('select[data-language-select]').forEach(function (select, index) {
      var root = select.closest('.language-switcher');
      if (!root) return;

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'language-trigger';
      button.setAttribute('aria-haspopup', 'listbox');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = '<span class="language-globe" aria-hidden="true"></span><span class="language-current"></span><span class="language-chevron" aria-hidden="true"></span>';

      var menu = document.createElement('div');
      menu.id = 'language-menu-' + index;
      menu.className = 'language-menu';
      menu.setAttribute('role', 'listbox');
      menu.hidden = true;
      button.setAttribute('aria-controls', menu.id);

      var switcher = { root: root, select: select, button: button, menu: menu, options: [] };
      Array.from(select.options).forEach(function (item) {
        var option = document.createElement('button');
        option.type = 'button';
        option.className = 'language-option';
        option.textContent = item.textContent;
        option.lang = item.lang || item.value;
        option.dataset.language = item.value;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.tabIndex = -1;
        option.addEventListener('click', function () {
          select.value = item.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          closeSwitcher(switcher, true);
        });
        menu.appendChild(option);
        switcher.options.push(option);
      });

      button.addEventListener('click', function () {
        if (menu.hidden) openSwitcher(switcher);
        else closeSwitcher(switcher, false);
      });
      button.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          openSwitcher(switcher);
        }
      });
      menu.addEventListener('keydown', function (event) {
        var current = switcher.options.indexOf(document.activeElement);
        var next;
        if (event.key === 'ArrowDown') next = (current + 1) % switcher.options.length;
        else if (event.key === 'ArrowUp') next = (current - 1 + switcher.options.length) % switcher.options.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = switcher.options.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          switcher.options[next].focus({ preventScroll: true });
        }
      });
      root.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !menu.hidden) {
          event.preventDefault();
          closeSwitcher(switcher, true);
        }
        if (event.key === 'Tab' && !menu.hidden) {
          // Resume the normal tab order from the trigger, outside the popup.
          closeSwitcher(switcher, true);
        }
      });
      root.appendChild(menu);
      root.appendChild(button);
      select.hidden = true;
      root.classList.add('language-switcher--enhanced');
      switchers.push(switcher);
    });
    document.addEventListener('pointerdown', function (event) {
      switchers.forEach(function (switcher) {
        if (!switcher.root.contains(event.target)) closeSwitcher(switcher, false);
      });
    });
    document.addEventListener('focusin', function (event) {
      switchers.forEach(function (switcher) {
        if (!switcher.root.contains(event.target)) closeSwitcher(switcher, false);
      });
    });
  }

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
    switchers.forEach(function (switcher) {
      var current = switcher.select.selectedOptions[0];
      var label = l === 'ko' ? '언어 선택' : 'Select language';
      switcher.button.querySelector('.language-current').textContent = current.textContent;
      switcher.button.setAttribute('aria-label', label + ': ' + current.textContent);
      switcher.menu.setAttribute('aria-label', label);
      switcher.options.forEach(function (option) {
        option.setAttribute('aria-selected', String(option.dataset.language === l));
      });
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

  function init() {
    initSwitchers();
    applyLang();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
