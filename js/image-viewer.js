// Image-specific content and zoom inside the shared preview modal.
(function () {
  var links = document.querySelectorAll('a[data-image-viewer]');
  if (!links.length || !window.PreviewModal) return;
  var modal = PreviewModal.create({
    className: 'image-viewer',
    actionHTML: '<button type="button" class="btn btn--ghost btn--icon image-viewer-zoom" aria-pressed="false">' +
      '<span class="material-symbols-outlined icon-sm" aria-hidden="true">zoom_in</span></button>',
    bodyHTML: '<div class="image-viewer-stage" tabindex="0"><img class="image-viewer-image" alt=""></div>' +
      '<p class="image-viewer-caption" tabindex="0" hidden></p>',
    onClose: function () { image.removeAttribute('src'); }
  });
  var viewer = modal.element;
  var stage = viewer.querySelector('.image-viewer-stage');
  var image = viewer.querySelector('img');
  var caption = viewer.querySelector('.image-viewer-caption');
  var zoom = viewer.querySelector('.image-viewer-zoom');
  var korean = true;

  function setZoom(enlarged) {
    viewer.classList.toggle('is-zoomed', enlarged);
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.querySelector('.material-symbols-outlined').textContent = enlarged ? 'zoom_out' : 'zoom_in';
    var label = enlarged ? (korean ? '화면에 맞춤' : 'Fit to screen') : (korean ? '원본 크기' : 'Actual size');
    zoom.setAttribute('aria-label', label);
    zoom.dataset.tip = label;
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
  }

  links.forEach(function (link) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var source = link.querySelector('img');
      if (!source) return;
      event.preventDefault();
      korean = document.documentElement.lang === 'ko';
      var figure = link.closest('figure');
      var description = figure && figure.querySelector('figcaption');
      if (!description) {
        var sibling = link.nextElementSibling || link.parentElement.nextElementSibling;
        if (sibling && sibling.matches('p.text-xs')) description = sibling;
      }
      caption.textContent = description ? description.textContent.trim() : '';
      caption.hidden = !caption.textContent;
      image.alt = source.alt;
      image.src = link.href;
      stage.setAttribute('aria-label', korean ? '이미지 미리보기 영역' : 'Image preview area');
      setZoom(false);
      modal.open(link, {
        title: (korean && link.dataset.previewTitleKo) || link.dataset.previewTitle || source.alt || (korean ? '이미지 미리보기' : 'Image preview'),
        closeLabel: korean ? '이미지 미리보기 닫기' : 'Close image preview',
        closeTip: korean ? '닫기' : 'Close'
      });
    });
  });
  zoom.addEventListener('click', function () { setZoom(!viewer.classList.contains('is-zoomed')); });
  image.addEventListener('click', function () { setZoom(!viewer.classList.contains('is-zoomed')); });
})();
