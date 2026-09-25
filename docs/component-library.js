// Internal documentation navigation; keep this out of public site scripts.
(function () {
  var disclosure = document.getElementById('cl-toc-disclosure');
  var links = Array.from(document.querySelectorAll('.cl-toc-list a'));
  var targets = links.map(function (link) {
    return document.getElementById(link.hash.slice(1));
  });
  var menuButton = disclosure.querySelector('summary');
  var menuIcon = menuButton.querySelector('.material-symbols-outlined');
  var desktop = window.matchMedia('(min-width: 768px)');
  var activeIndex = -1;
  var scheduled = false;

  function updateCurrent() {
    scheduled = false;
    var index = 0;
    var threshold = desktop.matches ? 96 : 112;
    targets.forEach(function (target, i) {
      if (target.getBoundingClientRect().top <= threshold) index = i;
    });
    // The final section may be too short to reach the top of the viewport.
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      index = links.length - 1;
    }
    if (index === activeIndex) return;
    activeIndex = index;
    links.forEach(function (link, i) {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrent);
  }

  function syncLayout() {
    disclosure.open = desktop.matches;
    syncMenuButton();
    scheduleUpdate();
  }

  function syncMenuButton() {
    var expanded = !desktop.matches && disclosure.open;
    menuIcon.textContent = expanded ? 'close' : 'menu';
    menuButton.setAttribute('aria-label', expanded ? '섹션 이동 메뉴 닫기' : '섹션 이동 메뉴 열기');
  }

  function closeMenu(restoreFocus) {
    if (desktop.matches || !disclosure.open) return;
    disclosure.open = false;
    if (restoreFocus) menuButton.focus({ preventScroll: true });
  }

  disclosure.addEventListener('toggle', syncMenuButton);
  disclosure.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    closeMenu(false);
    // Native anchors retain deep links, keyboard focus, and browser history.
  });
  document.addEventListener('pointerdown', function (event) {
    if (!disclosure.contains(event.target)) closeMenu(disclosure.contains(document.activeElement));
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !desktop.matches && disclosure.open) {
      event.preventDefault();
      closeMenu(true);
    }
  });
  disclosure.addEventListener('focusout', function (event) {
    if (!disclosure.contains(event.relatedTarget)) closeMenu(false);
  });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  desktop.addEventListener('change', syncLayout);
  if ('ResizeObserver' in window) {
    new ResizeObserver(scheduleUpdate).observe(document.querySelector('.cl-main'));
  }
  syncLayout();
})();

// Read displayed values from the actual specimens, rather than a second token map.
(function () {
  var pending = false;

  function refreshSpecs() {
    pending = false;
    document.querySelectorAll('[data-color-token]').forEach(function (label) {
      var channels = getComputedStyle(label).getPropertyValue(label.dataset.colorToken).trim().split(/\s+/).map(Number);
      if (channels.length === 3 && channels.every(Number.isFinite)) {
        label.textContent = '#' + channels.map(function (channel) {
          return Math.round(channel).toString(16).padStart(2, '0');
        }).join('').toUpperCase();
      }
    });
    document.querySelectorAll('[data-current-theme]').forEach(function (label) {
      var theme = document.documentElement.dataset.theme === 'dark' ? '다크' : '라이트';
      label.textContent = theme + (document.documentElement.dataset.themePreference === 'system' ? ' · 시스템 설정' : ' · 직접 선택');
    });
    document.querySelectorAll('[data-type-for]').forEach(function (label) {
      var sample = document.getElementById(label.dataset.typeFor);
      var style = getComputedStyle(sample);
      var font = style.fontFamily.split(',')[0].replace(/["']/g, '');
      var size = Math.round(parseFloat(style.fontSize) * 100) / 100;
      var line = Math.round(parseFloat(style.lineHeight) * 100) / 100;
      label.textContent = font + ' · ' + size + 'px · ' + style.fontWeight + ' · 줄높이 ' + (Number.isFinite(line) ? line + 'px' : style.lineHeight);
    });
  }

  function scheduleSpecs() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(refreshSpecs);
  }

  new MutationObserver(scheduleSpecs).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang', 'data-theme', 'data-theme-preference']
  });
  window.addEventListener('resize', scheduleSpecs);
  window.addEventListener('load', scheduleSpecs);
  document.addEventListener('DOMContentLoaded', scheduleSpecs);
  if (document.fonts) document.fonts.ready.then(scheduleSpecs);
  scheduleSpecs();

  document.querySelectorAll('[data-button-demo]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.getElementById('button-demo-status').textContent = button.dataset.buttonDemo + ' · clicked';
    });
  });

  document.querySelectorAll('[data-cursor-demo]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.getElementById('cursor-demo-status').textContent = 'Action completed · 기본 손 모양 커서를 사용하는 동작입니다.';
    });
  });

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', async function () {
      var code = document.getElementById(button.dataset.copy);
      var status = button.parentElement.querySelector('[role="status"]');
      status.textContent = '';
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = '복사했습니다. 경로와 [REPLACE]를 교체하세요.';
      } catch (_) {
        // Clipboard permissions vary. Leave the original code visible and selectable.
        code.parentElement.focus({ preventScroll: true });
        var range = document.createRange();
        range.selectNodeContents(code);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = '자동 복사가 제한되어 코드를 선택했습니다. Ctrl+C / ⌘C로 복사하세요.';
      }
    });
  });
})();
