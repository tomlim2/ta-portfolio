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
