// Keep enlarged project screenshots in the current page.
(function () {
  var links = document.querySelectorAll('a[data-image-viewer]');
  if (!links.length || typeof HTMLDialogElement === 'undefined' ||
      typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  var viewer = document.createElement('dialog');
  viewer.className = 'image-viewer';
  viewer.innerHTML = '<div class="image-viewer-toolbar">' +
    '<button type="button" class="image-viewer-zoom" aria-pressed="false"></button>' +
    '<button type="button" class="image-viewer-close" autofocus></button></div>' +
    '<div class="image-viewer-stage"><img class="image-viewer-image" alt=""></div>' +
    '<p class="image-viewer-caption"></p>';
  document.body.appendChild(viewer);

  var stage = viewer.querySelector('.image-viewer-stage');
  var image = viewer.querySelector('img');
  var caption = viewer.querySelector('.image-viewer-caption');
  var zoom = viewer.querySelector('.image-viewer-zoom');
  var close = viewer.querySelector('.image-viewer-close');
  var trigger = null;
  var korean = true;

  function setZoom(enlarged) {
    viewer.classList.toggle('is-zoomed', enlarged);
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.textContent = enlarged ? (korean ? '화면에 맞춤' : 'Fit to screen') :
      (korean ? '원본 크기' : 'Actual size');
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
  }

  links.forEach(function (link) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', function (event) {
      // Retain normal browser controls for opening a link in another tab.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var source = link.querySelector('img');
      if (!source) return;
      event.preventDefault();
      trigger = link;
      korean = document.documentElement.lang === 'ko';
      viewer.setAttribute('aria-label', korean ? '이미지 크게 보기' : 'Enlarged image');
      close.textContent = korean ? '닫기 ×' : 'Close ×';
      var figure = link.closest('figure');
      var description = figure && figure.querySelector('figcaption');
      // Older case studies use a small paragraph next to the image as a caption.
      if (!description) {
        var sibling = link.nextElementSibling || link.parentElement.nextElementSibling;
        if (sibling && sibling.matches('p.text-xs')) description = sibling;
      }
      caption.textContent = description ? description.textContent.trim() : '';
      image.alt = source.alt;
      image.src = link.href;
      setZoom(false);
      document.documentElement.classList.add('image-viewer-open');
      viewer.showModal();
    });
  });

  zoom.addEventListener('click', function () {
    setZoom(!viewer.classList.contains('is-zoomed'));
  });
  image.addEventListener('click', function () {
    setZoom(!viewer.classList.contains('is-zoomed'));
  });
  close.addEventListener('click', function () { viewer.close(); });
  viewer.addEventListener('click', function (event) {
    if (event.target === viewer || event.target === stage) viewer.close();
  });
  viewer.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') return;
    if (!event.shiftKey && document.activeElement === close) {
      event.preventDefault();
      zoom.focus();
    } else if (event.shiftKey && document.activeElement === zoom) {
      event.preventDefault();
      close.focus();
    }
  });
  // Native dialog handles Escape; restore the reading position and focus on close.
  viewer.addEventListener('close', function () {
    document.documentElement.classList.remove('image-viewer-open');
    image.removeAttribute('src');
    if (trigger) trigger.focus({ preventScroll: true });
  });
})();
