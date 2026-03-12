// TA Portfolio - Main JS

(function () {
  // --- Active nav highlighting with IntersectionObserver ---

  const sections = document.querySelectorAll('#projects, #about');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink(sectionId) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + sectionId) {
        link.classList.add('text-white');
        link.classList.remove('text-muted');
      } else {
        link.classList.add('text-muted');
        link.classList.remove('text-white');
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // --- Hide nav on scroll down, show on scroll up ---

  var nav = document.querySelector('nav');
  var lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    var currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 56) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  });

  // --- Lock/unlock logic ---

  var UNLOCK_ICON = '<path d="M252.31-160h455.38q5.39 0 8.85-3.46t3.46-8.85v-375.38q0-5.39-3.46-8.85t-8.85-3.46H252.31q-5.39 0-8.85 3.46t-3.46 8.85v375.38q0 5.39 3.46 8.85t8.85 3.46Zm277.27-150.42Q550-330.85 550-360t-20.42-49.58Q509.15-430 480-430t-49.58 20.42Q410-389.15 410-360t20.42 49.58Q450.85-290 480-290t49.58-20.42ZM240-160v-400 400Zm12.31 60q-29.92 0-51.12-21.19Q180-142.39 180-172.31v-375.38q0-29.92 21.19-51.12Q222.39-620 252.31-620H540v-80q0-74.92 52.54-127.46Q645.08-880 720-880q74.92 0 127.46 52.54Q900-774.92 900-700h-60q0-50-35-85t-85-35q-50 0-85 35t-35 85v80h107.69q29.92 0 51.12 21.19Q780-577.61 780-547.69v375.38q0 29.92-21.19 51.12Q737.61-100 707.69-100H252.31Z"/>';

  function unlockCards() {
    document.querySelectorAll('.card-locked').forEach(function (card) {
      card.classList.remove('card-locked');
    });
    document.querySelectorAll('.lock-icon').forEach(function (svg) {
      svg.innerHTML = UNLOCK_ICON;
    });
  }

  if (typeof Auth !== 'undefined' && Auth.isAuthed()) {
    unlockCards();
  }

  // --- Password modal for locked cards ---

  var pwModal = document.getElementById('pw-modal');
  var pwInput = document.getElementById('pw-input');
  var pwSubmit = document.getElementById('pw-submit');
  var pwError = document.getElementById('pw-error');
  var pendingHref = null;

  if (pwModal) {
    // Auto-open modal if redirected from a locked subpage
    var urlParams = new URLSearchParams(window.location.search);
    var unlockTarget = urlParams.get('unlock');
    if (unlockTarget) {
      pendingHref = unlockTarget;
      pwModal.classList.remove('hidden');
      setTimeout(function () { pwInput.focus(); }, 100);
      // Clean up URL
      history.replaceState(null, '', window.location.pathname + window.location.hash);
    }

    // Intercept clicks on locked card placeholders
    document.querySelectorAll('.card-locked .card-placeholder, .card-locked .card-thumb').forEach(function (el) {
      var link = el.closest('a');
      if (!link) return;
      link.addEventListener('click', function (e) {
        if (link.closest('.card-locked')) {
          e.preventDefault();
          pendingHref = link.getAttribute('href');
          pwModal.classList.remove('hidden');
          pwInput.value = '';
          pwError.classList.add('hidden');
          pwSubmit.disabled = false;
          pwSubmit.textContent = 'Unlock';
          setTimeout(function () { pwInput.focus(); }, 100);
        }
      });
    });

    // Close modal on backdrop click
    pwModal.addEventListener('click', function (e) {
      if (e.target === pwModal) {
        pwModal.classList.add('hidden');
        pendingHref = null;
      }
    });

    function tryUnlock() {
      var password = pwInput.value;
      if (!password) return;
      pwSubmit.disabled = true;
      pwSubmit.textContent = '...';

      // Verify by fetching and decrypting the target page
      var testUrl = pendingHref || 'projects/character-system.html';
      fetch(testUrl).then(function (r) { return r.text(); }).then(function (html) {
        var match = html.match(/<script id="encrypted-data"[^>]*>([\s\S]*?)<\/script>/);
        if (!match) throw new Error('no data');
        return Auth.decrypt(match[1], password);
      }).then(function () {
        // Password correct
        Auth.setAuthed(password);
        unlockCards();
        pwModal.classList.add('hidden');
        if (pendingHref) window.location.href = pendingHref;
      }).catch(function () {
        pwError.classList.remove('hidden');
        pwSubmit.disabled = false;
        pwSubmit.textContent = 'Unlock';
        pwInput.value = '';
        pwInput.focus();
      });
    }

    pwSubmit.addEventListener('click', tryUnlock);
    pwInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
  }

  // --- Hero text scramble on hover (per line) ---

  var glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

  function scrambleTo(el, target, duration) {
    var textEl = el.querySelector('p, h1');
    if (!textEl) return;
    if (el._scrambleAnim) cancelAnimationFrame(el._scrambleAnim);
    var start = performance.now();
    var len = Math.max(textEl.textContent.length, target.length);

    var flickerCount = 0;
    function step(now) {
      flickerCount++;
      if (flickerCount % 3 !== 0 && (now - start) / duration < 1) {
        el._scrambleAnim = requestAnimationFrame(step);
        return;
      }
      var progress = Math.min((now - start) / duration, 1);
      var result = '';
      for (var i = 0; i < len; i++) {
        if (i >= target.length) continue;
        var charDone = progress > (i + 1) / len;
        if (charDone) {
          result += target[i];
        } else if (target[i] === ' ' || target[i] === '·' || target[i] === '&' || target[i] === '+') {
          result += target[i];
        } else {
          result += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      textEl.textContent = result;
      if (progress < 1) {
        el._scrambleAnim = requestAnimationFrame(step);
      } else {
        textEl.textContent = target;
        el._scrambleAnim = null;
      }
    }
    el._scrambleAnim = requestAnimationFrame(step);
  }

  document.querySelectorAll('.scramble-line').forEach(function (line) {
    line.style.cursor = 'default';
    line.addEventListener('mouseenter', function () {
      var en = line.getAttribute('data-en');
      if (en) scrambleTo(line, en, 500);
      if (line.classList.contains('md:-ml-[0.7rem]')) {
        line.style.marginLeft = '0';
      }
    });
    line.addEventListener('mouseleave', function () {
      var ko = line.getAttribute('data-ko');
      if (ko) scrambleTo(line, ko, 500);
      if (line.classList.contains('md:-ml-[0.7rem]')) {
        line.style.marginLeft = '';
      }
    });
  });

  // --- Avatar hover → tilt + scramble job title & name ---

  var heroAvatar = document.getElementById('hero-avatar');
  var avatarTargets = document.querySelectorAll('.avatar-scramble');

  if (heroAvatar && avatarTargets.length) {
    heroAvatar.addEventListener('mouseenter', function () {
      heroAvatar.style.transform = 'rotate(20deg)';
      avatarTargets.forEach(function (line) {
        var en = line.getAttribute('data-en');
        if (en) scrambleTo(line, en, 500);
        if (line.classList.contains('md:-ml-[0.7rem]')) {
          line.style.marginLeft = '0';
        }
      });
    });
    heroAvatar.addEventListener('mouseleave', function () {
      heroAvatar.style.transform = 'rotate(0deg)';
      avatarTargets.forEach(function (line) {
        var ko = line.getAttribute('data-ko');
        if (ko) scrambleTo(line, ko, 500);
        if (line.classList.contains('md:-ml-[0.7rem]')) {
          line.style.marginLeft = '';
        }
      });
    });
  }

  // --- Mobile hamburger menu toggle ---

  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link inside it is clicked
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });
  }
})();
